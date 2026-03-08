import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (userId) {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      redirect("/onboarding");
    }
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
