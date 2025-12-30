"use client";

import { useEffect, useMemo, useState } from "react";
import slugify from "slugify";
import type { AnySection, PageDocShape } from "@/lib/pagebuilder/section-types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableSectionRow } from "@/app/admin/pages/_builder/SortableSectionRow";
import { SectionEditor } from "@/app/admin/pages/_builder/SectionEditor";
import { AddSectionDrawer } from "@/app/admin/pages/_builder/AddSectionDrawer";
import { useParams } from "next/navigation";

export default function PageBuilder() {

  const [page, setPage] = useState<PageDocShape | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const routeParams = useParams();
  const id = Array.isArray(routeParams?.id) ? routeParams.id[0] : (routeParams?.id as string);

  async function load() {
    const res = await fetch(`/api/admin/pages/v2/${id}`, { cache: "no-store" });
    const data = await res.json();
    setPage(data.page);
    setActiveSectionId(data.page?.sections?.[0]?.id ?? null);
  }

  async function save(next?: PageDocShape) {
    const payload = next ?? page;
    if (!payload) return;
    setSaving(true);

    await fetch(`/api/admin/pages/v2/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  title: payload.title,
  status: payload.status,
  seo: payload.seo,
  theme: payload.theme, // ✅ ADD THIS
  sections: payload.sections,
}),
 });

    setSaving(false);
  }

  useEffect(() => {
  load();
}, [id]);


  const activeSection = useMemo(() => {
    if (!page || !activeSectionId) return null;
    return page.sections.find((s) => s.id === activeSectionId) ?? null;
  }, [page, activeSectionId]);

  function updatePage(patch: Partial<PageDocShape>) {
    if (!page) return;
    const next = { ...page, ...patch };
    setPage(next);
  }

  function updateSection(updated: AnySection) {
    if (!page) return;
    const next = {
      ...page,
      sections: page.sections.map((s) => (s.id === updated.id ? updated : s)),
    };
    setPage(next);
  }

  function removeSection(id: string) {
    if (!page) return;
    const nextSections = page.sections.filter((s) => s.id !== id);
    const next = { ...page, sections: nextSections };
    setPage(next);
    if (activeSectionId === id) setActiveSectionId(nextSections[0]?.id ?? null);
  }

  function addSection(sec: AnySection) {
    if (!page) return;
    const next = { ...page, sections: [...page.sections, sec] };
    setPage(next);
    setActiveSectionId(sec.id);
  }

  if (!page) return <div style={{ padding: 24 }}>Loading…</div>;

  const previewUrl = `/${page.seo.slug}`;

  return (
    <div style={{ padding: 16 }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <input
            value={page.title}
            onChange={(e) => {
              const title = e.target.value;
              updatePage({
                title,
                seo: { ...page.seo, slug: page.seo.slug || slugify(title, { lower: true, strict: true }) },
              });
            }}
            style={{ fontSize: 20, fontWeight: 700, padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", minWidth: 360 }}
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ opacity: 0.7 }}>Slug:</span>
            <input
              value={page.seo.slug}
              onChange={(e) => updatePage({ seo: { ...page.seo, slug: slugify(e.target.value, { lower: true, strict: true }) } })}
              style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #ddd", width: 260 }}
            />
            <a href={previewUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
              Open Preview
            </a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select
            value={page.status}
            onChange={(e) => updatePage({ status: e.target.value as any })}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={() => save()}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd" }}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16, marginTop: 16 }}>
        {/* Left: Outline + reorder */}
        <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Page Sections</h3>
            <AddSectionDrawer onAdd={addSection} />
          </div>

          <div style={{ marginTop: 10 }}>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (!over || active.id === over.id) return;
                const oldIndex = page.sections.findIndex((s) => s.id === active.id);
                const newIndex = page.sections.findIndex((s) => s.id === over.id);
                const next = { ...page, sections: arrayMove(page.sections, oldIndex, newIndex) };
                setPage(next);
              }}
            >
              <SortableContext items={page.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                {page.sections.map((s) => (
                  <SortableSectionRow
                    key={s.id}
                    section={s}
                    isActive={s.id === activeSectionId}
                    onClick={() => setActiveSectionId(s.id)}
                    onToggleHidden={() => updateSection({ ...s, isHidden: !s.isHidden } as AnySection)}
                    onDelete={() => removeSection(s.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Right: Editor */}
        <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Editor</h3>

          {/* SEO block */}
          <div style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>SEO</div>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Meta Title</label>
            <input
              value={page.seo.metaTitle ?? ""}

              onChange={(e) => updatePage({ seo: { ...page.seo, metaTitle: e.target.value } })}
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }}
            />
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Meta Description</label>
            <textarea
              value={page.seo.metaDescription ?? ""}

              onChange={(e) => updatePage({ seo: { ...page.seo, metaDescription: e.target.value } })}
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", minHeight: 80, marginBottom: 8 }}
            />
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Canonical URL (optional)</label>
            <input
              value={page.seo.canonicalUrl || ""}
              onChange={(e) => updatePage({ seo: { ...page.seo, canonicalUrl: e.target.value } })}
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 8 }}
            />
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={!!page.seo.noIndex}
                onChange={(e) => updatePage({ seo: { ...page.seo, noIndex: e.target.checked } })}
              />
              Noindex (do not show in Google)
            </label>
          </div>

          {!activeSection ? (
            <div>Select a section from the left.</div>
          ) : (
            <SectionEditor section={activeSection} onChange={updateSection} />
          )}
        </div>
      </div>
    </div>
  );
}
