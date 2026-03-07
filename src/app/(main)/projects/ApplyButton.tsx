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

    const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await fetch(`/api/projects/${projectId}/roles/${roleId}/apply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        if (res.ok) {
          alert("Application submitted!");
          setOpen(false);
        } else {
          console.error("Failed to submit application");
        }
      } catch (error) {
        console.error("Error submitting application:", error);
      }
    }

    if (!open) {
      return (
        <button onClick={() => setOpen(true)} className="bg-orange-600 ...">
          Apply
        </button>
      )
    }

    return (
      <form onSubmit={handleApply}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Why are you a good fit for this role?"
          className="..."
        />
        <button type="submit">Submit Application</button>
      </form>
    )
  }
