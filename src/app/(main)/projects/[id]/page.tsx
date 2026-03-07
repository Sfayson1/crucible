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
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-zinc-300 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech: string) => (
          <span
            key={tech}
            className="bg-zinc-700 text-zinc-200 px-2 py-1 rounded text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="text-sm text-zinc-300 mb-4">
        Posted by {project.owner.name}
      </p>

      <h2 className="text-2xl font-semibold mb-4">Open Roles</h2>
      <div className="space-y-4 mb-6">
        {project.roles.map((role: (typeof project.roles)[number]) => (
          <div
            key={role.id}
            className="border border-zinc-700 rounded-lg p-4 bg-zinc-900"
          >
            <h3 className="text-lg font-semibold mb-1">{role.title}</h3>
            <p className="text-zinc-400 text-sm mb-4">{role.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {role.skillsNeeded.map((skill: string) => (
                <span
                  key={skill}
                  className="bg-zinc-700 text-zinc-200 px-2 py-1 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <ApplyButton projectId={project.id} roleId={role.id} />
          </div>
        ))}
      </div>

      {/* --- NEW: Owner-only Add Role button --- */}
      {isOwner && (
        <Link
          href={`/projects/${project.id}/add-role`}
          className="inline-block bg-orange-600 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded"
        >
          + Add Role
        </Link>
      )}
    </div>
  );
}
