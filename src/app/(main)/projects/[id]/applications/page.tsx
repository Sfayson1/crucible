import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import ApplicationActions from "@/components/projects/ApplicationActions";

export default async function ProjectApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const currentUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!currentUser) redirect("/onboarding");

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      roles: {
        include: {
          applications: {
            include: { applicant: true },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!project) notFound();
  if (project.ownerId !== currentUser.id) redirect(`/projects/${id}`);

  const totalApplications = project.roles.reduce(
    (sum, role) => sum + role.applications.length,
    0
  );
  const pendingCount = project.roles.reduce(
    (sum, role) => sum + role.applications.filter((a) => a.status === "PENDING").length,
    0
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href={`/projects/${id}`}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-4 inline-block"
          >
            ← {project.title}
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold">Applications</h1>
              <p className="text-zinc-400 text-sm mt-1">{project.title}</p>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <p className="text-2xl font-bold">{totalApplications}</p>
                <p className="text-zinc-400 text-xs">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-400">{pendingCount}</p>
                <p className="text-zinc-400 text-xs">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {project.roles.map((role) => (
          <section key={role.id}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold">{role.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">
                {role.applications.length} applicant{role.applications.length !== 1 ? "s" : ""}
              </span>
            </div>

            {role.applications.length === 0 ? (
              <div className="border border-dashed border-zinc-800 rounded-xl p-6 text-center">
                <p className="text-zinc-500 text-sm">No applications yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {role.applications.map((application) => (
                  <div
                    key={application.id}
                    className="border border-zinc-800 rounded-xl p-5 bg-zinc-900 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{application.applicant.name}</h3>
                          <span className="text-zinc-500 text-sm">{application.applicant.email}</span>
                        </div>
                        {application.applicant.githubUrl && (
                          <a
                            href={application.applicant.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-3 inline-block"
                          >
                            {application.applicant.githubUrl}
                          </a>
                        )}
                        <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                          {application.message}
                        </p>
                        {application.applicant.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {application.applicant.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0">
                        <ApplicationActions
                          applicationId={application.id}
                          projectId={id}
                          currentStatus={application.status}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {project.roles.length === 0 && (
          <div className="border border-dashed border-zinc-700 rounded-xl p-10 text-center">
            <p className="text-zinc-400 mb-3">No roles on this project yet.</p>
            <Link
              href={`/projects/${id}/add-role`}
              className="text-orange-500 hover:text-orange-400 text-sm font-medium"
            >
              Add a role →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
