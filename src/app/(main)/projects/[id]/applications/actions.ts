"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(
  applicationId: string,
  status: "ACCEPTED" | "REJECTED",
  projectId: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const currentUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!currentUser) throw new Error("User not found");

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { role: { include: { project: true } } },
  });

  if (!application || application.role.project.ownerId !== currentUser.id) {
    throw new Error("Unauthorized");
  }

  await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });

  if (status === "ACCEPTED") {
    await prisma.projectRole.update({
      where: { id: application.roleId },
      data: { isFilled: true },
    });
  }

  revalidatePath(`/projects/${projectId}/applications`);
}
