import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await currentUser();

    const { name, bio, githubUrl, skills } = await req.json();

    const email = user?.emailAddresses[0]?.emailAddress ?? "";
    const skillsArray = skills ? skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

    const existingByEmail = await prisma.user.findUnique({ where: { email } });

    const createdUser = existingByEmail
      ? await prisma.user.update({
          where: { email },
          data: { clerkId: userId, name, bio, githubUrl, skills: skillsArray },
        })
      : await prisma.user.upsert({
          where: { clerkId: userId },
          update: { name, bio, githubUrl, skills: skillsArray },
          create: { clerkId: userId, email, name, bio, githubUrl, skills: skillsArray },
        });

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
