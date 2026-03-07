"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [skills, setSkills] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, githubUrl: github, skills }),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-white mb-6">Complete your profile</h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">GitHub URL</label>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Skills (comma-separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded w-full">
          Save profile
        </button>
      </form>
    </div>
  )
}
