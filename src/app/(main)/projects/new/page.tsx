"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techstack, setTechstack] = useState("");
  const [role, setRole] = useState("");
  const [roledescription, setRoleDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, techstack, role, roledescription }),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-white mb-6">Create a new project</h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Tech Stack (comma separated)</label>
          <input
            type="text"
            value={techstack}
            onChange={(e) => setTechstack(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Role Needed</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Role Description</label>
          <textarea
            value={roledescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  )
}
