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

    const createdUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user?.emailAddresses[0]?.emailAddress ?? "",
        name,
        bio,
        githubUrl,
        skills: skills ? skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      }
    });

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
