"use client"
import { useState } from "react"

export default function ApplyButton({
  projectId,
  roleId,
}: {
  projectId: string
  roleId: string
}) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleApply = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}/roles/${roleId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        alert("Application submitted!");
        setOpen(false);
        setMessage("");
      } else {
        console.error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-orange-600 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded"
      >
        Apply
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Why are you a good fit for this role?"
        className="w-full border border-zinc-700 bg-zinc-800 text-white rounded px-3 py-2 text-sm"
        rows={3}
      />
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="bg-orange-600 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded"
        >
          Submit Application
        </button>
        <button
          onClick={() => setOpen(false)}
          className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
