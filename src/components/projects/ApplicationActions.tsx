"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/app/(main)/projects/[id]/applications/actions";

export default function ApplicationActions({
  applicationId,
  projectId,
  currentStatus,
}: {
  applicationId: string;
  projectId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  if (currentStatus !== "PENDING") {
    return (
      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
          currentStatus === "ACCEPTED"
            ? "bg-green-900/40 text-green-300 border-green-700"
            : "bg-red-900/40 text-red-300 border-red-800"
        }`}
      >
        {currentStatus}
      </span>
    );
  }

  async function handle(status: "ACCEPTED" | "REJECTED") {
    setLoading(true);
    try {
      await updateApplicationStatus(applicationId, status, projectId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        disabled={loading}
        onClick={() => handle("ACCEPTED")}
        className="text-xs px-3 py-1.5 rounded-lg font-medium bg-green-700 hover:bg-green-600 text-white transition-colors disabled:opacity-50"
      >
        Accept
      </button>
      <button
        disabled={loading}
        onClick={() => handle("REJECTED")}
        className="text-xs px-3 py-1.5 rounded-lg font-medium bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
