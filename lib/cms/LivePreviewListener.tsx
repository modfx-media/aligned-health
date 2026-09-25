"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export function LivePreviewListener() {
  const router = useRouter();
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "";

  if (!serverURL) return null;

  return (
    <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
  );
}
