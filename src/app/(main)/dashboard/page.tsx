import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 1. Get the current user from Clerk
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // 2. Look up the user in the database
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/onboarding");
  }

  // 3. Display welcome message with their name
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {user.name}!
      </h1>

      {/* 4. Sections */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2">My Projects</h2>
          <p className="text-zinc-400">No projects yet.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">My Applications</h2>
          <p className="text-zinc-400">No applications yet.</p>
        </section>
      </div>
    </div>
  );
}
