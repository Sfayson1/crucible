# Crucible

**Find your team. Build something real.**

Crucible is a project collaboration platform for developers who want to build side projects together. Post a project, describe the roles you need filled, and connect with developers who want to contribute.

## Features

- **Post projects** — describe what you're building, your tech stack, and what roles you need
- **Open roles** — add multiple roles to a project with required skills
- **Apply to roles** — browse open projects and apply with a message
- **Application management** — project owners can accept or reject applicants
- **Dashboard** — track your projects and applications in one place
- **Auth** — sign up with email via Clerk

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + shadcn/ui
- **Auth** — Clerk
- **Database** — PostgreSQL (Neon)
- **ORM** — Prisma
- **Deployment** — Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) account (PostgreSQL)
- A [Clerk](https://clerk.com) account

### Local Setup

1. Clone the repo

```bash
git clone https://github.com/Sfayson1/crucible.git
cd crucible
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

4. Run the database migration

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Sign in / sign up pages
│   ├── (main)/          # Main app pages (dashboard, projects)
│   └── api/             # API routes
├── components/
│   ├── layout/          # Navbar
│   └── projects/        # ApplyButton, ApplicationActions
└── lib/
    └── prisma.ts        # Prisma client singleton
```

## Author

[Sherika Fayson](https://www.linkedin.com/in/sherika-fayson/) — [GitHub](https://github.com/Sfayson1)
