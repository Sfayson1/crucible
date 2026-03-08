import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DemoProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id, isDemo: true },
    include: { owner: true, roles: true },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Demo banner */}
      <div className="bg-orange-600/20 border-b border-orange-600/40 px-6 py-3 text-center">
        <p className="text-sm text-orange-300">
          This is an interactive demo.{" "}
          <Link href="/sign-up" className="underline hover:text-orange-200 transition-colors">
            Sign up
          </Link>{" "}
          to post a project or apply to real ones.
        </p>
      </div>

      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/demo"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-4 inline-block"
          >
            ← Demo Projects
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-zinc-400 text-sm">Posted by {project.owner.name}</p>
            </div>
            <span className="mt-1 text-xs px-2.5 py-1 rounded-full font-medium border shrink-0 bg-green-900/40 text-green-300 border-green-700">
              OPEN
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
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
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
          <h2 className="text-xl font-semibold mb-4">
            Open Roles
            <span className="ml-2 text-sm font-normal text-zinc-400">
              ({project.roles.length})
            </span>
          </h2>

          <div className="space-y-4">
            {project.roles.map((role) => (
              <div
                key={role.id}
                className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{role.description}</p>
                {role.skillsNeeded.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {role.skillsNeeded.map((skill) => (
                      <span
                        key={skill}
                        className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 py-0.5 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href="/sign-up"
                  className="inline-block text-sm bg-orange-600 hover:bg-orange-500 transition-colors text-white px-4 py-2 rounded-lg font-medium"
                >
                  Sign up to apply
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
