import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; roleId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roleId } = await params;
    const { message } = await request.json();

    // Get the logged-in user from DB
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the role (and project owner)
    const role = await prisma.projectRole.findUnique({
      where: { id: roleId },
      include: { project: true },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Prevent owners from applying to their own project
    if (role.project.ownerId === user.id) {
      return NextResponse.json(
        { error: "You cannot apply to your own project" },
        { status: 403 }
      );
    }

    const application = await prisma.application.create({
      data: {
        message,
        applicantId: user.id,
        roleId: role.id,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Error applying to role:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
