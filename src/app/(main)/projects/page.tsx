import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isDemo: false },
    include: { owner: true, roles: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Browse Projects</h1>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-zinc-400 text-lg mb-2">No projects posted yet.</p>
          <p className="text-zinc-500 text-sm mb-6">Be the first to post one.</p>
          <Link
            href="/projects/new"
            className="bg-orange-600 hover:bg-orange-500 transition-colors text-white px-6 py-2.5 rounded-lg text-sm font-medium"
          >
            Post a project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project: (typeof projects)[number]) => (
            <div key={project.id} className="border border-zinc-600 rounded-lg p-6 bg-zinc-800">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-zinc-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="bg-zinc-700 text-zinc-200 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-sm text-zinc-300 mb-4">Posted by {project.owner.name}</p>

              <Link href={`/projects/${project.id}`} className="text-orange-500 hover:underline text-sm">
                View Project →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
