"use client";

import { useState } from "react";
import type { AnySection } from "@/lib/pagebuilder/section-types";

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `sec_${Date.now().toString(16)}_${Math.random().toString(16).slice(2)}`;

function template(type: AnySection["type"]): AnySection {
  const id = makeId();

  switch (type) {
    case "heroWithForm":
      return {
        id,
        type,
        title: "Hero + Form",
        data: {
          breadcrumb: "Home > Service",
          h1: "YOUR H1",
          subtext: "Write a short SEO intro paragraph.",
          primaryCtaText: "BOOK A FREE CALL",
          primaryCtaUrl: "/contact",
          trustBadges: [],
          heroBgImageUrl: "",
          form: {
            heading: "Speak to an expert today",
            fields: { name: true, email: true, phone: true, message: true },
            submitText: "SEND NOW",
            successMessage: "Thanks! We will contact you shortly.",
          },
        },
      };

    case "intro":
      return {
        id,
        type,
        title: "Intro",
        data: { h2: "Intro Heading", content: "<p>Write content here.</p>" },
      };

    case "featureTabs":
      return {
        id,
        type,
        title: "Features (User/Driver/Admin)",
        data: {
          h2: "Main Features",
          tabs: [
            { key: "user", label: "User", items: [] },
            { key: "driver", label: "Driver", items: [] },
            { key: "admin", label: "Admin", items: [] },
          ],
        },
      };

    case "businessCards":
      return {
        id,
        type,
        title: "Business Cards",
        data: { h2: "Business Cards", cards: [] },
      };

    case "richContent":
      return {
        id,
        type,
        title: "Rich Content",
        data: {
          h2: "Section Heading",
          content: "<p>Write content…</p>",
          image: { url: "", alt: "", position: "right" },
        },
      };

    case "costFactors":
     return { id, type, title: "Cost Factors", data: { h2: "Cost Factors", bullets: [] } };

      


    case "comparisonTable":
  return {
    id,
    type,
    title: "Comparison Table",
    data: { h2: "Comparison", leftTitle: "Option A", rightTitle: "Option B", rows: [] },
  };



    case "whyChoose":
     return { id, type, title: "Why Choose", data: { h2: "Why Choose Us", bullets: [] } };


      

    case "processTimeline":
      return { id, type, title: "Process Timeline", data: { h2: "Process", steps: [] } };

    case "caseStudies":
      return { id, type, title: "Case Studies", data: { h2: "Case Studies", items: [] } };

    case "testimonials":
      return { id, type, title: "Testimonials", data: { h2: "Testimonials", items: [] } };

    case "techStack":
  return {
    id,
    type,
    title: "Tech Stack",
    data: {
      h2: "Tech Stack",
      tabs: [
        { label: "Frontend", items: [] },
        { label: "Backend", items: [] },
        { label: "Database", items: [] },
      ],
    },
  };

      

    case "faqs":
      return { id, type, title: "FAQs", data: { h2: "FAQs", faqs: [], enableSchema: true } };

    case "resources":
      return { id, type, title: "Resources", data: { h2: "Resources", items: [] } };

    case "finalCta":
      return {
        id,
        type,
        title: "Final CTA",
        data: { h2: "Ready to start?", subtext: "", buttonText: "CONTACT US", buttonUrl: "/contact" },
      };

    default:
      // safe fallback so app never crashes if a new type appears
      return {
        id,
        type: "richContent",
        title: "Rich Content",
        data: { h2: "Section Heading", content: "<p>Write content…</p>" },
      };
  }
}

export function AddSectionDrawer({ onAdd }: { onAdd: (sec: AnySection) => void }) {
  const [open, setOpen] = useState(false);

  const options: AnySection["type"][] = [
    "heroWithForm",
    "intro",
    "businessCards",
    "featureTabs",
    "richContent",
    "costFactors",
    "comparisonTable",
    "whyChoose",
    "processTimeline",
    "caseStudies",
    "testimonials",
    "techStack",
    "faqs",
    "resources",
    "finalCta",
  ];

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd" }}>
        + Add
      </button>

      {open && (
        <div style={overlay} onClick={() => setOpen(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Add Section</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {options.map((t) => (
                <button
                  key={t}
                  style={cardBtn}
                  onClick={() => {
                    onAdd(template(t));
                    setOpen(false);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.25)",
  display: "grid",
  placeItems: "center",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  width: 520,
  maxWidth: "92vw",
  background: "white",
  borderRadius: 16,
  padding: 14,
  border: "1px solid #eee",
};

const cardBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #eee",
  background: "white",
  textAlign: "left",
};
