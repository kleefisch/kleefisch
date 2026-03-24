import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const existingConfig = await prisma.adminUser.count();

  if (existingConfig > 0) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
