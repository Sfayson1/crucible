import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const projects = await prisma.project.findMany({
    where: { isDemo: true },
    include: { owner: true, roles: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Demo banner */}
      <div className="bg-orange-600/20 border-b border-orange-600/40 px-6 py-3 text-center">
        <p className="text-sm text-orange-300">
          This is an interactive demo — explore how Crucible works without creating an account.{" "}
          <Link href="/sign-up" className="underline hover:text-orange-200 transition-colors">
            Sign up to post your own project.
          </Link>
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Demo Projects</h1>
          <p className="text-zinc-400">Browse these sample projects to see how Crucible works.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-lg font-semibold leading-snug">{project.title}</h2>
                <span className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium border bg-green-900/40 text-green-300 border-green-700">
                  OPEN
                </span>
              </div>

              <p className="text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-2.5 py-0.5 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500">
                  {project.roles.length} open {project.roles.length === 1 ? "role" : "roles"} · Posted by {project.owner.name}
                </p>
                <Link
                  href={`/demo/${project.id}`}
                  className="text-sm text-orange-500 hover:text-orange-400 transition-colors font-medium"
                >
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
