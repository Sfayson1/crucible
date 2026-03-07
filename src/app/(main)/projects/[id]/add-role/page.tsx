"use client"
import { use, useState } from "react"
import { useRouter } from "next/navigation"

export default function AddRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${id}/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, description }),
      });
      if (res.ok) {
        router.push(`/projects/${id}`);
      } else {
        console.error("Failed to add role");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-white mb-6">Add a new role</h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Role Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-zinc-300">Role Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-zinc-700 bg-zinc-900 text-white rounded px-3 py-2" />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
          Add Role
        </button>
      </form>
    </div>
  );
}
