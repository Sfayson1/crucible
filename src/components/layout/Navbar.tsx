"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Crucible
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="text-sm text-zinc-200 hover:text-white transition-colors"
          >
            Browse Projects
          </Link>

          {isSignedIn ? (
            <>
              <Link
                href="/projects/new"
                className="text-sm text-zinc-200 hover:text-white transition-colors"
              >
                Post a Project
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-zinc-200 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button size="sm" className="bg-white text-zinc-900 hover:bg-zinc-100">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white">
                  Get started
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
