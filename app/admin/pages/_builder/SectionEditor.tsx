"use client";

import type { AnySection } from "@/lib/pagebuilder/section-types";
import TipTapEditor from "@/components/editor/TipTapEditor";
import ImageUpload from "@/components/uploads/ImageUpload";

export function SectionEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (s: AnySection) => void;
}) {
  switch (section.type) {
    case "heroWithForm":
      return <HeroEditor section={section} onChange={onChange} />;
    case "intro":
      return <IntroEditor section={section} onChange={onChange} />;
     case "businessCards":
  return <BusinessCardsEditor section={section} onChange={onChange} />;
case "testimonials":
  return <TestimonialsEditor section={section} onChange={onChange} />;
case "techStack":
  return <TechStackEditor section={section} onChange={onChange} />;
case "whyChoose":
  return <WhyChooseEditor section={section} onChange={onChange} />;
case "costFactors":
  return <CostFactorsEditor section={section} onChange={onChange} />;
case "processTimeline":
  return <ProcessTimelineEditor section={section} onChange={onChange} />;
case "comparisonTable":
  return <ComparisonTableEditor section={section} onChange={onChange} />;
case "caseStudies":
  return <CaseStudiesEditor section={section} onChange={onChange} />;
case "resources":
  return <ResourcesEditor section={section} onChange={onChange} />;

    case "featureTabs":
      return <FeatureTabsEditor section={section} onChange={onChange} />;
    case "faqs":
      return <FaqEditor section={section} onChange={onChange} />;
    case "richContent":
    default:
      return <RichContentEditor section={section} onChange={onChange} />;
  }
}

function HeroEditor({ section, onChange }: any) {
  const d = section.data;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Field label="Breadcrumb" value={d.breadcrumb || ""} onChange={(v) => onChange({ ...section, data: { ...d, breadcrumb: v } })} />
      <Field label="H1" value={d.h1} onChange={(v) => onChange({ ...section, data: { ...d, h1: v } })} />
      <Field label="Intro Paragraph" value={d.subtext} onChange={(v) => onChange({ ...section, data: { ...d, subtext: v } })} />
      <Field label="Primary CTA Text" value={d.primaryCtaText} onChange={(v) => onChange({ ...section, data: { ...d, primaryCtaText: v } })} />
      <Field label="Primary CTA URL" value={d.primaryCtaUrl} onChange={(v) => onChange({ ...section, data: { ...d, primaryCtaUrl: v } })} />

      <div style={{ borderTop: "1px solid #eee", paddingTop: 10 }}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Form</div>
        <Field label="Form Heading" value={d.form.heading} onChange={(v) => onChange({ ...section, data: { ...d, form: { ...d.form, heading: v } } })} />
        <Toggle label="Name" checked={d.form.fields.name} onChange={(b) => onChange({ ...section, data: { ...d, form: { ...d.form, fields: { ...d.form.fields, name: b } } } })} />
        <Toggle label="Email" checked={d.form.fields.email} onChange={(b) => onChange({ ...section, data: { ...d, form: { ...d.form, fields: { ...d.form.fields, email: b } } } })} />
        <Toggle label="Phone" checked={d.form.fields.phone} onChange={(b) => onChange({ ...section, data: { ...d, form: { ...d.form, fields: { ...d.form.fields, phone: b } } } })} />
        <Toggle label="Message" checked={d.form.fields.message} onChange={(b) => onChange({ ...section, data: { ...d, form: { ...d.form, fields: { ...d.form.fields, message: b } } } })} />
        <Field label="Submit Button Text" value={d.form.submitText} onChange={(v) => onChange({ ...section, data: { ...d, form: { ...d.form, submitText: v } } })} />
        <Field label="Success Message" value={d.form.successMessage} onChange={(v) => onChange({ ...section, data: { ...d, form: { ...d.form, successMessage: v } } })} />
      </div>
    </div>
  );
}

function IntroEditor({ section, onChange }: any) {
  const d = section.data;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Field label="H2" value={d.h2} onChange={(v) => onChange({ ...section, data: { ...d, h2: v } })} />

<ImageUpload
  kind="content"
  label="Section Image (optional)"
  hint="Auto resized for web (max width 1200px). Mobile will stack automatically."
  value={d.image?.url || ""}
  onChange={(url) =>
    onChange({
      ...section,
      data: {
        ...d,
        image: { ...(d.image || {}), url },
      },
    })
  }
/>

<label style={{ display: "grid", gap: 6 }}>
  <span style={{ fontSize: 12, fontWeight: 800 }}>Image Position</span>
  <select
    value={d.image?.position || "right"}
    onChange={(e) =>
      onChange({
        ...section,
        data: {
          ...d,
          image: { ...(d.image || {}), position: e.target.value },
        },
      })
    }
    style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
  >
    <option value="left">Left</option>
    <option value="right">Right</option>
    <option value="top">Top</option>
    <option value="bottom">Bottom</option>
  </select>
</label>




      <div>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Content (Rich Text)</div>
        <TipTapEditor value={d.content} onChange={(html) => onChange({ ...section, data: { ...d, content: html } })} />
      </div>
    </div>
  );
}

function RichContentEditor({ section, onChange }: any) {
  const d = section.data;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Field label="H2 (optional)" value={d.h2 || ""} onChange={(v) => onChange({ ...section, data: { ...d, h2: v } })} />
      <div>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Content (Rich Text)</div>
        <TipTapEditor value={d.content} onChange={(html) => onChange({ ...section, data: { ...d, content: html } })} />
      </div>
    </div>
  );
}

function FeatureTabsEditor({ section, onChange }: any) {
  const d = section.data;

  function updateTab(idx: number, tab: any) {
    const tabs = [...d.tabs];
    tabs[idx] = tab;
    onChange({ ...section, data: { ...d, tabs } });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Field label="H2" value={d.h2} onChange={(v) => onChange({ ...section, data: { ...d, h2: v } })} />

      {d.tabs.map((t: any, tabIndex: number) => (
        <div key={t.key} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 800 }}>{t.label} Tab</div>
            <button
              style={btn}
              onClick={() => {
                const items = [...t.items, { title: "New Feature", iconUrl: "", description: "", linkText: "", linkUrl: "", openInNewTab: true }];
                updateTab(tabIndex, { ...t, items });
              }}
            >
              + Add Feature
            </button>
          </div>

          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
            {t.items.map((it: any, itemIndex: number) => (
              <div key={itemIndex} style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: 10 }}>
                <Field
                  label="Title"
                  value={it.title}
                  onChange={(v) => {
                    const items = [...t.items];
                    items[itemIndex] = { ...it, title: v };
                    updateTab(tabIndex, { ...t, items });
                  }}
                />
                <ImageUpload
  kind="icon"
  label="Icon"
  hint="Auto resized to 64×64 PNG (best for mobile + desktop)."
  value={it.iconUrl || ""}
  onChange={(url) => {
    const items = [...t.items];
    items[itemIndex] = { ...it, iconUrl: url };
    updateTab(tabIndex, { ...t, items });
  }}
/>

<Field
  label="Icon URL (optional)"
  value={it.iconUrl || ""}
  onChange={(v) => {
    const items = [...t.items];
    items[itemIndex] = { ...it, iconUrl: v };
    updateTab(tabIndex, { ...t, items });
  }}
/>

                  
                                  
                
                <Field
                  label="Description (optional)"
                  value={it.description || ""}
                  onChange={(v) => {
                    const items = [...t.items];
                    items[itemIndex] = { ...it, description: v };
                    updateTab(tabIndex, { ...t, items });
                  }}
                />
                <Field
                  label="Anchor Text (optional)"
                  value={it.linkText || ""}
                  onChange={(v) => {
                    const items = [...t.items];
                    items[itemIndex] = { ...it, linkText: v };
                    updateTab(tabIndex, { ...t, items });
                  }}
                />
                <Field
                  label="URL (optional)"
                  value={it.linkUrl || ""}
                  onChange={(v) => {
                    const items = [...t.items];
                    items[itemIndex] = { ...it, linkUrl: v };
                    updateTab(tabIndex, { ...t, items });
                  }}
                />
                <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                  <input
                    type="checkbox"
                    checked={!!it.openInNewTab}
                    onChange={(e) => {
                      const items = [...t.items];
                      items[itemIndex] = { ...it, openInNewTab: e.target.checked };
                      updateTab(tabIndex, { ...t, items });
                    }}
                  />
                  Open in new tab
                </label>

                <button
                  style={{ ...btn, marginTop: 8, borderColor: "#f1c6c6" }}
                  onClick={() => {
                    const items = t.items.filter((_: any, i: number) => i !== itemIndex);
                    updateTab(tabIndex, { ...t, items });
                  }}
                >
                  Remove Feature
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqEditor({ section, onChange }: any) {
  const d = section.data;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Field label="H2" value={d.h2} onChange={(v) => onChange({ ...section, data: { ...d, h2: v } })} />

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" checked={!!d.enableSchema} onChange={(e) => onChange({ ...section, data: { ...d, enableSchema: e.target.checked } })} />
        Enable FAQ Schema (JSON-LD)
      </label>

      <button
        style={btn}
        onClick={() => onChange({ ...section, data: { ...d, faqs: [...d.faqs, { q: "New Question", a: "New Answer" }] } })}
      >
        + Add FAQ
      </button>

      {d.faqs.map((f: any, idx: number) => (
        <div key={idx} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10 }}>
          <Field
            label="Question"
            value={f.q}
            onChange={(v) => {
              const faqs = [...d.faqs];
              faqs[idx] = { ...f, q: v };
              onChange({ ...section, data: { ...d, faqs } });
            }}
          />
          <Field
            label="Answer"
            value={f.a}
            onChange={(v) => {
              const faqs = [...d.faqs];
              faqs[idx] = { ...f, a: v };
              onChange({ ...section, data: { ...d, faqs } });
            }}
          />
          <button
            style={{ ...btn, borderColor: "#f1c6c6" }}
            onClick={() => {
              const faqs = d.faqs.filter((_: any, i: number) => i !== idx);
              onChange({ ...section, data: { ...d, faqs } });
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "white",
};


/* ===========================
   Extra Editors (added)
   =========================== */

type EditorProps = {
  section: AnySection;
  onChange: (sec: AnySection) => void;
};

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 800 }}>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 800 }}>{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minHeight: 90 }}
      />
    </label>
  );
}

function Btn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid #ddd", background: "white" }}>
      {children}
    </button>
  );
}

function SectionH2({ section, onChange }: { section: AnySection; onChange: (sec: AnySection) => void }) {
  const d: any = section.data || {};
  return (
    <TextInput
      label="H2"
      value={d.h2 || ""}
      onChange={(v) => onChange({ ...section, data: { ...d, h2: v } } as AnySection)}
      placeholder="Section heading"
    />
  );
}

/* ----- Case Studies ----- */
function CaseStudiesEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const items: any[] = Array.isArray(d.items) ? d.items : [];

  const setItems = (next: any[]) => onChange({ ...section, data: { ...d, items: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Items</div>
      {items.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput
            label="Title"
            value={it.title || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, title: v };
              setItems(next);
            }}
          />
          <TextArea
            label="Description"
            value={it.description || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, description: v };
              setItems(next);
            }}
          />
          <TextInput
            label="Link URL"
            value={it.linkUrl || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, linkUrl: v };
              setItems(next);
            }}
            placeholder="/case-study/xyz or https://..."
          />

          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Btn>
          </div>
        </div>
      ))}

      <Btn
        onClick={() =>
          setItems([
            ...items,
            {
              title: "Case Study",
              description: "",
              linkUrl: "",
            },
          ])
        }
      >
        + Add Case Study
      </Btn>
    </div>
  );
}

/* ----- Resources ----- */
function ResourcesEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const items: any[] = Array.isArray(d.items) ? d.items : [];
  const setItems = (next: any[]) => onChange({ ...section, data: { ...d, items: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Items</div>
      {items.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput
            label="Title"
            value={it.title || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, title: v };
              setItems(next);
            }}
          />
          <TextInput
            label="Link URL"
            value={it.linkUrl || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, linkUrl: v };
              setItems(next);
            }}
          />
          <Btn onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}

      <Btn onClick={() => setItems([...items, { title: "Resource", linkUrl: "" }])}>+ Add Resource</Btn>
    </div>
  );
}

/* ----- Tech Stack ----- */
function TechStackEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const items: any[] = Array.isArray(d.items) ? d.items : [];
  const setItems = (next: any[]) => onChange({ ...section, data: { ...d, items: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Items</div>
      {items.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput
            label="Name"
            value={it.name || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, name: v };
              setItems(next);
            }}
          />
          <TextInput
            label="Icon URL (optional)"
            value={it.iconUrl || ""}
            onChange={(v) => {
              const next = [...items];
              next[i] = { ...it, iconUrl: v };
              setItems(next);
            }}
            placeholder="https://..."
          />
          <Btn onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}

      <Btn onClick={() => setItems([...items, { name: "React", iconUrl: "" }])}>+ Add Tech</Btn>
    </div>
  );
}

/* ----- Testimonials ----- */
function TestimonialsEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const items: any[] = Array.isArray(d.items) ? d.items : [];
  const setItems = (next: any[]) => onChange({ ...section, data: { ...d, items: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Items</div>
      {items.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput label="Name" value={it.name || ""} onChange={(v) => { const next=[...items]; next[i]={...it,name:v}; setItems(next);} } />
          <TextInput label="Role" value={it.role || ""} onChange={(v) => { const next=[...items]; next[i]={...it,role:v}; setItems(next);} } />
          <TextInput label="Company" value={it.company || ""} onChange={(v) => { const next=[...items]; next[i]={...it,company:v}; setItems(next);} } />
          <TextArea label="Quote" value={it.quote || ""} onChange={(v) => { const next=[...items]; next[i]={...it,quote:v}; setItems(next);} } />
          <TextInput label="Avatar URL (optional)" value={it.avatarUrl || ""} onChange={(v) => { const next=[...items]; next[i]={...it,avatarUrl:v}; setItems(next);} } />

          <Btn onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}

      <Btn onClick={() => setItems([...items, { name: "Name", role: "", company: "", quote: "", avatarUrl: "" }])}>+ Add Testimonial</Btn>
    </div>
  );
}

/* ----- Business Cards ----- */
function BusinessCardsEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const cards: any[] = Array.isArray(d.cards) ? d.cards : [];
  const setCards = (next: any[]) => onChange({ ...section, data: { ...d, cards: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Cards</div>
      {cards.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput label="Title" value={it.title || ""} onChange={(v) => { const next=[...cards]; next[i]={...it,title:v}; setCards(next);} } />
          <TextArea label="Description" value={it.description || ""} onChange={(v) => { const next=[...cards]; next[i]={...it,description:v}; setCards(next);} } />
          <TextInput label="Icon URL (optional)" value={it.iconUrl || ""} onChange={(v) => { const next=[...cards]; next[i]={...it,iconUrl:v}; setCards(next);} } />
          <TextInput label="Link Text" value={it.linkText || ""} onChange={(v) => { const next=[...cards]; next[i]={...it,linkText:v}; setCards(next);} } />
          <TextInput label="Link URL" value={it.linkUrl || ""} onChange={(v) => { const next=[...cards]; next[i]={...it,linkUrl:v}; setCards(next);} } />

          <Btn onClick={() => setCards(cards.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}

      <Btn onClick={() => setCards([...cards, { title: "Card title", description: "", iconUrl: "", linkText: "", linkUrl: "" }])}>+ Add Card</Btn>
    </div>
  );
}

/* ----- Why Choose ----- */
function WhyChooseEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const items: any[] = Array.isArray(d.items) ? d.items : [];
  const setItems = (next: any[]) => onChange({ ...section, data: { ...d, items: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Items</div>
      {items.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput label="Title" value={it.title || ""} onChange={(v) => { const next=[...items]; next[i]={...it,title:v}; setItems(next);} } />
          <TextArea label="Description" value={it.description || ""} onChange={(v) => { const next=[...items]; next[i]={...it,description:v}; setItems(next);} } />
          <TextInput label="Icon URL (optional)" value={it.iconUrl || ""} onChange={(v) => { const next=[...items]; next[i]={...it,iconUrl:v}; setItems(next);} } />
          <Btn onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}

      <Btn onClick={() => setItems([...items, { title: "Reason", description: "", iconUrl: "" }])}>+ Add Item</Btn>
    </div>
  );
}

/* ----- Cost Factors ----- */
function CostFactorsEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const items: any[] = Array.isArray(d.items) ? d.items : [];
  const setItems = (next: any[]) => onChange({ ...section, data: { ...d, items: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Items</div>
      {items.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput label="Title" value={it.title || ""} onChange={(v) => { const next=[...items]; next[i]={...it,title:v}; setItems(next);} } />
          <TextArea label="Description" value={it.description || ""} onChange={(v) => { const next=[...items]; next[i]={...it,description:v}; setItems(next);} } />
          <Btn onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}
      <Btn onClick={() => setItems([...items, { title: "Factor", description: "" }])}>+ Add Factor</Btn>
    </div>
  );
}

/* ----- Process Timeline ----- */
function ProcessTimelineEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const steps: any[] = Array.isArray(d.steps) ? d.steps : [];
  const setSteps = (next: any[]) => onChange({ ...section, data: { ...d, steps: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Steps</div>
      {steps.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput label="Title" value={it.title || ""} onChange={(v) => { const next=[...steps]; next[i]={...it,title:v}; setSteps(next);} } />
          <TextArea label="Description" value={it.description || ""} onChange={(v) => { const next=[...steps]; next[i]={...it,description:v}; setSteps(next);} } />
          <Btn onClick={() => setSteps(steps.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}
      <Btn onClick={() => setSteps([...steps, { title: "Step", description: "" }])}>+ Add Step</Btn>
    </div>
  );
}

/* ----- Comparison Table ----- */
function ComparisonTableEditor({ section, onChange }: EditorProps) {
  const d: any = section.data || {};
  const rows: any[] = Array.isArray(d.rows) ? d.rows : [];
  const setRows = (next: any[]) => onChange({ ...section, data: { ...d, rows: next } } as AnySection);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SectionH2 section={section} onChange={onChange} />

      <div style={{ fontWeight: 800, fontSize: 12 }}>Rows</div>
      {rows.map((it, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
          <TextInput label="Feature" value={it.feature || ""} onChange={(v) => { const next=[...rows]; next[i]={...it,feature:v}; setRows(next);} } />
          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={!!it.you}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...it, you: e.target.checked };
                setRows(next);
              }}
            />
            You
          </label>
          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={!!it.others}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...it, others: e.target.checked };
                setRows(next);
              }}
            />
            Others
          </label>

          <Btn onClick={() => setRows(rows.filter((_, idx) => idx !== i))}>Remove</Btn>
        </div>
      ))}

      <Btn onClick={() => setRows([...rows, { feature: "Feature", you: true, others: false }])}>+ Add Row</Btn>
    </div>
  );
}
