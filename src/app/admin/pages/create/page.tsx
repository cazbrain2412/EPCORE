"use client";

import { useState } from "react";

export default function AdminCreatePage() {
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function create() {
  setErr(null);
  const t = title.trim();
  if (!t) {
    setErr("Please enter a page title.");
    return;
  }

  setBusy(true);

  try {
    const res = await fetch("/api/admin/pages/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: t }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      throw new Error("Server returned an invalid response");
    }

    if (!res.ok) {
      throw new Error(data?.error || "Create failed");
    }

    window.location.href = `/admin/pages/${data.page._id}`;
  } catch (e: any) {
    setErr(e?.message || "Create failed");
    setBusy(false);
  }
}

      






  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Create Page</h1>

      <div style={{ marginTop: 14, maxWidth: 520, display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={{ fontWeight: 700 }}>Page Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Taxi App Development"
          style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
        />

        {err ? <div style={{ color: "crimson", fontWeight: 700 }}>{err}</div> : null}

        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button
            onClick={create}
            disabled={busy}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ddd", background: busy ? "#f5f5f5" : "white" }}
          >
            {busy ? "Creating…" : "Create & Open Builder"}
          </button>

          <a href="/admin/pages" style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ddd", textDecoration: "none" }}>
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
