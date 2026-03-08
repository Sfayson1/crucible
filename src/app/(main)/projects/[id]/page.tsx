import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import ApplyButton from "@/components/projects/ApplyButton";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { owner: true, roles: true },
  });

  if (!project) {
    notFound();
  }

  const { userId } = await auth();

  const currentUser = userId
    ? await prisma.user.findUnique({
        where: { clerkId: userId },
      })
    : null;

  const isOwner = currentUser?.id === project.ownerId;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/projects" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-4 inline-block">
            ← Browse Projects
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-zinc-400 text-sm">Posted by {project.owner.name}</p>
            </div>
            <span className={`mt-1 text-xs px-2.5 py-1 rounded-full font-medium border shrink-0 ${
              project.status === "OPEN"
                ? "bg-green-900/40 text-green-300 border-green-700"
                : "bg-zinc-800 text-zinc-300 border-zinc-700"
            }`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Description */}
        <section>
          <p className="text-zinc-300 leading-relaxed">{project.description}</p>
        </section>

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Roles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Open Roles
              <span className="ml-2 text-sm font-normal text-zinc-400">({project.roles.length})</span>
            </h2>
            {isOwner && (
              <div className="flex gap-2">
                <Link
                  href={`/projects/${project.id}/applications`}
                  className="text-sm border border-zinc-700 hover:border-zinc-500 transition-colors text-zinc-300 hover:text-white px-4 py-1.5 rounded-lg font-medium"
                >
                  View Applications
                </Link>
                <Link
                  href={`/projects/${project.id}/add-role`}
                  className="text-sm bg-orange-600 hover:bg-orange-500 transition-colors text-white px-4 py-1.5 rounded-lg font-medium"
                >
                  + Add Role
                </Link>
              </div>
            )}
          </div>

          {project.roles.length === 0 ? (
            <div className="border border-dashed border-zinc-700 rounded-xl p-10 text-center">
              <p className="text-zinc-400">No roles posted yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {project.roles.map((role: (typeof project.roles)[number]) => (
                <div
                  key={role.id}
                  className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 hover:border-zinc-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{role.description}</p>
                  {role.skillsNeeded.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {role.skillsNeeded.map((skill: string) => (
                        <span
                          key={skill}
                          className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 py-0.5 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {role.isFilled ? (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border bg-zinc-800 text-zinc-400 border-zinc-700">
                      Filled
                    </span>
                  ) : (
                    <ApplyButton projectId={project.id} roleId={role.id} />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
