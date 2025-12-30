"use client";

import { useRef, useState } from "react";

export default function ImageUpload({
  kind,
  value,
  onChange,
  label,
  hint,
}: {
  kind: "icon" | "content" | "hero" | "og";
  value?: string;
  onChange: (url: string) => void;
  label: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", kind);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      onChange(data.url);
    } catch (e: any) {
      alert(e?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontWeight: 800 }}>{label}</div>
      {hint ? <div style={{ fontSize: 12, opacity: 0.75 }}>{hint}</div> : null}

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd" }}
        >
          {busy ? "Uploading…" : "Upload"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.currentTarget.value = "";
          }}
        />

        {value ? (
          <a href={value} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
            View
          </a>
        ) : (
          <span style={{ fontSize: 12, opacity: 0.7 }}>No file</span>
        )}
      </div>
    </div>
  );
}
