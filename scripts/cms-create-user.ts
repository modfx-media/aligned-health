import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";

async function main() {
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
    throw new Error("PAYLOAD_SECRET and DATABASE_URL are required.");
  }

  const email = process.env.CMS_ADMIN_EMAIL || "admin@alignedhealthoc.com";
  const password = process.env.CMS_ADMIN_PASSWORD || randomBytes(18).toString("base64url");

  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("../payload.config"),
  ]);
  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
  });
  if (existing.totalDocs > 0) {
    console.log("A user already exists. Refusing to create another.");
    return;
  }

  await payload.create({
    collection: "users",
    data: { email, password, name: "Aligned Health Admin" },
    overrideAccess: true,
  });

  await writeFile(".cms-admin.local", `email=${email}\npassword=${password}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  console.log(`Created admin ${email}. Credentials are in .cms-admin.local (gitignored).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
