"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { AnySection } from "@/lib/pagebuilder/section-types";

export function SortableSectionRow({
  section,
  isActive,
  onClick,
  onToggleHidden,
  onDelete,
}: {
  section: AnySection;
  isActive: boolean;
  onClick: () => void;
  onToggleHidden: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 10,
    borderRadius: 12,
    border: isActive ? "1px solid #111" : "1px solid #eee",
    marginTop: 8,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    background: section.isHidden ? "#fff7f7" : "white",
  };

  const label = section.title || section.type;

  return (
    <div ref={setNodeRef} style={style} onClick={onClick}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span
          {...attributes}
          {...listeners}
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            border: "1px solid #eee",
            display: "grid",
            placeItems: "center",
            cursor: "grab",
            userSelect: "none",
          }}
          title="Drag to reorder"
        >
          ⋮⋮
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{label}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{section.type}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={(e) => (e.stopPropagation(), onToggleHidden())} style={btn}>
          {section.isHidden ? "Show" : "Hide"}
        </button>
        <button onClick={(e) => (e.stopPropagation(), onDelete())} style={{ ...btn, borderColor: "#f1c6c6" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "white",
};

