import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/onboarding");
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: user.id },
    include: { roles: true },
    orderBy: { createdAt: "desc" },
  });

  const applications = await prisma.application.findMany({
    where: { applicantId: user.id },
    include: {
      role: {
        include: { project: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const acceptedCount = applications.filter((a: { status: string }) => a.status === "ACCEPTED").length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-zinc-400 text-sm mb-1">Welcome back</p>
          <h1 className="text-3xl font-bold">{user.name}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Projects</p>
            <p className="text-3xl font-bold">{projects.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Applications</p>
            <p className="text-3xl font-bold">{applications.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Accepted</p>
            <p className="text-3xl font-bold text-green-400">{acceptedCount}</p>
          </div>
        </div>

        {/* My Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Projects</h2>
            <Link
              href="/projects/new"
              className="text-sm bg-orange-600 hover:bg-orange-500 transition-colors text-white px-4 py-1.5 rounded-lg font-medium"
            >
              + New Project
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="border border-dashed border-zinc-700 rounded-xl p-10 text-center">
              <p className="text-zinc-400 mb-3">No projects yet.</p>
              <Link href="/projects/new" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                Create your first project →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-zinc-800 rounded-xl p-5 bg-zinc-900 flex items-center justify-between hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-zinc-400 mt-0.5">
                      {project.roles.length} role{project.roles.length !== 1 ? "s" : ""}
                      <span className="mx-2">·</span>
                      <span className={project.status === "OPEN" ? "text-green-400" : "text-zinc-400"}>
                        {project.status}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Applications */}
        <section>
          <h2 className="text-xl font-semibold mb-4">My Applications</h2>

          {applications.length === 0 ? (
            <div className="border border-dashed border-zinc-700 rounded-xl p-10 text-center">
              <p className="text-zinc-400 mb-3">No applications yet.</p>
              <Link href="/projects" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                Browse open projects →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-zinc-800 rounded-xl p-5 bg-zinc-900 flex items-center justify-between hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{application.role.project.title}</h3>
                    <p className="text-sm text-zinc-400 mt-0.5">{application.role.title}</p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                      application.status === "ACCEPTED"
                        ? "bg-green-900/40 text-green-300 border-green-700"
                        : application.status === "REJECTED"
                        ? "bg-red-900/40 text-red-300 border-red-800"
                        : "bg-zinc-800 text-zinc-300 border-zinc-700"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
