import { generateCommonMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateCommonMetadata(
  "Session - DevBlog Admin",
  "Manage your session and authentication settings for the DevBlog admin dashboard.",
  "/session",
  undefined,
  ["session", "authentication", "user settings", "admin"]
);

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}