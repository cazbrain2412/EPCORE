"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PageRow = {
  _id: string;
  title: string;
  status: "draft" | "published" | "trash";
  seo: { slug: string; metaTitle: string; metaDescription: string };
  updatedAt: string;
};

export default function AdminPagesList() {
  const [rows, setRows] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/pages/v2", { cache: "no-store" });
    const data = await res.json();
    setRows(data.pages || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function goCreate() {
    window.location.href = "/admin/pages/create";
  }

  async function duplicate(id: string) {
    const res = await fetch(`/api/admin/pages/v2/${id}/duplicate`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      alert(data?.error || "Duplicate failed");
      return;
    }
    window.location.href = `/admin/pages/${data.page._id}`;
  }

  async function del(id: string) {
    const ok = confirm("Delete this page? This cannot be undone.");
    if (!ok) return;

    const res = await fetch(`/api/admin/pages/v2/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Delete failed");
      return;
    }
    load();
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Pages</h1>
        <button onClick={goCreate} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd" }}>
          + Create Page
        </button>
      </div>

      {loading ? (
        <p style={{ marginTop: 16 }}>Loading…</p>
      ) : (
        <div style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 2fr 1fr 1fr",
              padding: 12,
              background: "#fafafa",
              fontWeight: 600,
            }}
          >
            <div>Title</div>
            <div>Status</div>
            <div>Slug</div>
            <div>Updated</div>
            <div>Actions</div>
          </div>

          {rows.map((r) => (
            <div
              key={r._id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 2fr 1fr 1fr",
                padding: 12,
                borderTop: "1px solid #eee",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ fontWeight: 700 }}>
                <Link href={`/admin/pages/${r._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {r.title}
                </Link>
              </div>
              <div>{r.status}</div>
              <div>/{r.seo?.slug}</div>
              <div>{new Date(r.updatedAt).toLocaleString()}</div>

              <div style={{ display: "flex", gap: 8 }}>
                <Link
                  href={`/admin/pages/${r._id}`}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    textDecoration: "none",
                    color: "inherit",
                    display: "inline-block",
                  }}
                >
                  Edit
                </Link>

                <button onClick={() => duplicate(r._id)} style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #ddd" }}>
                  Duplicate
                </button>

                <button onClick={() => del(r._id)} style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #ddd" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
