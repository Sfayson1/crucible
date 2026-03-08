import { config } from "dotenv";
config({ path: ".env" });

import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create demo users
  const alex = await prisma.user.upsert({
    where: { email: "alex.chen@demo.com" },
    update: {},
    create: {
      clerkId: "demo_alex_chen",
      name: "Alex Chen",
      email: "alex.chen@demo.com",
      githubUrl: "https://github.com/alexchen",
      bio: "Full stack developer obsessed with developer tooling and open source.",
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    },
  });

  const maya = await prisma.user.upsert({
    where: { email: "maya.patel@demo.com" },
    update: {},
    create: {
      clerkId: "demo_maya_patel",
      name: "Maya Patel",
      email: "maya.patel@demo.com",
      githubUrl: "https://github.com/mayapatel",
      bio: "Backend engineer who loves distributed systems and clean APIs.",
      skills: ["Python", "FastAPI", "Docker", "AWS"],
    },
  });

  const jordan = await prisma.user.upsert({
    where: { email: "jordan.kim@demo.com" },
    update: {},
    create: {
      clerkId: "demo_jordan_kim",
      name: "Jordan Kim",
      email: "jordan.kim@demo.com",
      githubUrl: "https://github.com/jordankim",
      bio: "Frontend developer who cares deeply about accessibility and design systems.",
      skills: ["React", "Figma", "CSS", "Next.js"],
    },
  });

  const sam = await prisma.user.upsert({
    where: { email: "sam.rivera@demo.com" },
    update: {},
    create: {
      clerkId: "demo_sam_rivera",
      name: "Sam Rivera",
      email: "sam.rivera@demo.com",
      githubUrl: "https://github.com/samrivera",
      bio: "Mobile developer branching into full stack. Love building things people actually use.",
      skills: ["React Native", "JavaScript", "Firebase", "Expo"],
    },
  });

  // Project 1 — Dev tool
  await prisma.project.upsert({
    where: { id: "demo_project_1" },
    update: {},
    create: {
      id: "demo_project_1",
      isDemo: true,
      title: "OpenReview — Open Source Code Review Tool",
      description:
        "A lightweight, self-hostable code review tool built for small teams who don't want the overhead of GitHub Enterprise. Think GitHub PRs but simpler, faster, and fully open source. We're building the MVP with diff viewing, inline comments, and a basic approval workflow.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      githubUrl: "https://github.com/alexchen/openreview",
      status: "OPEN",
      ownerId: alex.id,
      roles: {
        create: [
          {
            title: "Backend Engineer",
            description:
              "Help design and build the API layer. You'll own the diff parsing logic and the comment threading system. Comfortable with PostgreSQL and REST APIs preferred.",
            skillsNeeded: ["Node.js", "PostgreSQL", "REST APIs"],
          },
          {
            title: "UI Engineer",
            description:
              "Build the diff viewer and comment UI. We want something clean and fast — no heavy dependencies. Experience with code editors or syntax highlighting a big plus.",
            skillsNeeded: ["React", "TypeScript", "CSS"],
          },
        ],
      },
    },
  });

  // Project 2 — Finance app
  await prisma.project.upsert({
    where: { id: "demo_project_2" },
    update: {},
    create: {
      id: "demo_project_2",
      isDemo: true,
      title: "Splitwise but for Roommates",
      description:
        "Building an app specifically for people who live together — track shared expenses, recurring bills, groceries, and IOUs. Cleaner than Splitwise for the roommate use case, with a native mobile app. We have the designs done and are ready to build.",
      techStack: ["React Native", "Expo", "Supabase", "TypeScript"],
      status: "OPEN",
      ownerId: sam.id,
      roles: {
        create: [
          {
            title: "React Native Developer",
            description:
              "Build out the core screens — expense entry, balance summary, and history. Designs are ready in Figma. Looking for someone who's shipped at least one RN app before.",
            skillsNeeded: ["React Native", "Expo", "TypeScript"],
          },
          {
            title: "Backend / Supabase Developer",
            description:
              "Set up the database schema, row-level security policies, and real-time subscriptions so balances update live. Supabase experience preferred but strong Postgres skills work too.",
            skillsNeeded: ["Supabase", "PostgreSQL", "TypeScript"],
          },
        ],
      },
    },
  });

  // Project 3 — AI tool
  await prisma.project.upsert({
    where: { id: "demo_project_3" },
    update: {},
    create: {
      id: "demo_project_3",
      isDemo: true,
      title: "JobTrail — AI-Powered Job Search Tracker",
      description:
        "A job search tracker that auto-fills application details from job postings using AI, tracks your pipeline, and gives you weekly insights on your search. Tired of spreadsheets. Building the thing we wish existed when we were job hunting.",
      techStack: ["Next.js", "Python", "FastAPI", "OpenAI API", "Neon"],
      status: "OPEN",
      ownerId: maya.id,
      roles: {
        create: [
          {
            title: "Frontend Developer",
            description:
              "Build the dashboard, application tracker UI, and onboarding flow. We want it to feel polished — this is a portfolio piece for all of us. Next.js + Tailwind stack.",
            skillsNeeded: ["Next.js", "TypeScript", "Tailwind CSS"],
          },
          {
            title: "AI / Prompt Engineer",
            description:
              "Own the AI features — job posting parser, auto-fill logic, and weekly insight summaries. You'll work in Python with the OpenAI API. Bonus if you have LangChain experience.",
            skillsNeeded: ["Python", "OpenAI API", "Prompt Engineering"],
          },
        ],
      },
    },
  });

  // Project 4 — Community tool
  await prisma.project.upsert({
    where: { id: "demo_project_4" },
    update: {},
    create: {
      id: "demo_project_4",
      isDemo: true,
      title: "DevDiary — Public Learning Journal for Developers",
      description:
        "A place to document what you're learning publicly. Like a TIL (Today I Learned) blog but structured around topics, skills, and progress. Great for junior devs building in public and senior devs who want to share knowledge without the overhead of a full blog.",
      techStack: ["Next.js", "Tailwind CSS", "PlanetScale", "MDX"],
      status: "OPEN",
      ownerId: jordan.id,
      roles: {
        create: [
          {
            title: "Full Stack Developer",
            description:
              "Help build the core journaling and publishing experience. MDX rendering, user profiles, and a simple feed. This is a good project if you want to learn Next.js App Router deeply.",
            skillsNeeded: ["Next.js", "TypeScript", "MDX"],
          },
          {
            title: "Designer / Frontend",
            description:
              "Own the visual design and frontend implementation. We want something that feels like a premium writing tool — think Linear meets Medium. Figma skills required.",
            skillsNeeded: ["Figma", "CSS", "React"],
          },
        ],
      },
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
