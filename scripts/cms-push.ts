async function main() {
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
    throw new Error("PAYLOAD_SECRET and DATABASE_URL are required.");
  }
  if (!process.env.DATABASE_URL.includes("-pooler")) {
    throw new Error("DATABASE_URL must be the Neon pooled connection string.");
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("../payload.config"),
  ]);
  const payload = await getPayload({ config });
  const users = await payload.count({ collection: "users", overrideAccess: true });
  console.log(JSON.stringify({ ok: true, users: users.totalDocs }));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
