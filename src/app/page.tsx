import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-4 inline-block rounded-full border border-orange-600/30 bg-orange-600/10 px-4 py-1 text-sm text-orange-400">
            For developers who build things
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Find your team.{" "}
            <span className="text-orange-500">Build something real.</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg text-zinc-400">
            Crucible connects developers who want to build side projects
            together. Post what you&apos;re working on, find the collaborators
            you need, and ship it.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-500 text-white px-8">
                Post a project
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 px-8">
                Browse projects
              </Button>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-zinc-800 py-24">
          <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Post your project",
                description:
                  "Describe what you're building, your tech stack, and what roles you need filled.",
              },
              {
                step: "02",
                title: "Find collaborators",
                description:
                  "Other grads browse open projects and apply to join based on their skills.",
              },
              {
                step: "03",
                title: "Build together",
                description:
                  "Accept the people you want, coordinate, and ship something you're proud of.",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-3 text-sm font-mono text-orange-500">{step}</div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
