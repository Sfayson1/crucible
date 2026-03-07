import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Crucible
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Browse Projects
          </Link>

          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white">
                Sign in
              </Button>
            </SignInButton>
            <Link href="/sign-up">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white">
                Get started
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
