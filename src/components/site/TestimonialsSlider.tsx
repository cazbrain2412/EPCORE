"use client";

import { useMemo, useRef } from "react";
import styles from "@/app/(site)/_styles/page-sections.module.css";

type Testimonial = {
  name?: string;
  role?: string;
  company?: string;
  quote?: string;
  avatarUrl?: string;
};

export default function TestimonialsSlider({
  h2,
  testimonials,
}: {
  h2?: string;
  testimonials: Testimonial[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => testimonials?.filter(Boolean) ?? [], [testimonials]);

  function scrollBy(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(420, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  if (!items.length) return null;

  return (
    <section className={styles.section}>
      {h2 ? <h2 className={styles.h2}>{h2}</h2> : null}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 10 }}>
        <button
          onClick={() => scrollBy(-1)}
          style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid #eef0f3", background: "#fff", fontWeight: 900 }}
          aria-label="Previous testimonials"
        >
          ←
        </button>
        <button
          onClick={() => scrollBy(1)}
          style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid #eef0f3", background: "#fff", fontWeight: 900 }}
          aria-label="Next testimonials"
        >
          →
        </button>
      </div>

      <div
        ref={scrollerRef}
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          paddingBottom: 6,
          scrollSnapType: "x mandatory",
        }}
      >
        {items.map((t, idx) => (
          <div
            key={idx}
            className={styles.card}
            style={{
              minWidth: 320,
              maxWidth: 420,
              padding: 16,
              scrollSnapAlign: "start",
              flex: "0 0 auto",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              {t.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.avatarUrl}
                  alt={t.name || "Customer"}
                  style={{ width: 44, height: 44, borderRadius: 14, objectFit: "cover", border: "1px solid #eef0f3" }}
                />
              ) : (
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "#f2f4f7", border: "1px solid #eef0f3" }} />
              )}

              <div>
                <div style={{ fontWeight: 900 }}>{t.name || "Customer"}</div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>
                  {[t.role, t.company].filter(Boolean).join(" • ")}
                </div>
              </div>
            </div>

            <div style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(2,6,23,0.8)" }}>
              <span style={{ fontWeight: 900, marginRight: 6 }}>“</span>
              {t.quote || ""}
              <span style={{ fontWeight: 900, marginLeft: 6 }}>”</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
