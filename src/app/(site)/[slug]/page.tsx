import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";
import { notFound } from "next/navigation";

function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const inp: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
};



export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();

  const page = await Page.findOne({ "seo.slug": slug, status: "published" }).lean();
  if (!page) return notFound();

  const faqsSection = (page.sections || []).find((s: any) => s.type === "faqs" && s.data?.enableSchema);
  const schema = faqsSection?.data?.faqs?.length ? faqSchema(faqsSection.data.faqs) : null;

  const theme = (page as any).theme || {};
  const primary = theme.primary || "#f58220";
  const secondary = theme.secondary || "#111";

  const themeVars = {
    ["--primary" as any]: primary,
    ["--secondary" as any]: secondary,
  } as React.CSSProperties;


  return (
        <main style={themeVars}>

      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}

      {(page.sections || []).map((sec: any) => {
        if (sec.isHidden) return null;

        switch (sec.type) {
          case "heroWithForm":
            return (
              <section key={sec.id} style={{ padding: "64px 24px", borderBottom: "1px solid #eee" }}>
                <div
  style={{
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
  }}
>

                  <div>
                    {sec.data.breadcrumb ? <div style={{ opacity: 0.7, marginBottom: 10 }}>{sec.data.breadcrumb}</div> : null}
                    <h1 style={{ fontSize: 44, lineHeight: 1.05, fontWeight: 900 }}>{sec.data.h1}</h1>
                    <p style={{ marginTop: 14, fontSize: 16, opacity: 0.9 }}>{sec.data.subtext}</p>

                    <a
                      href={sec.data.primaryCtaUrl}
                      style={{ ...S.primaryBtn, width: "100%", cursor: "pointer" }}


                    >
                      {sec.data.primaryCtaText}
                    </a>
                  </div>

                  <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
                    <div style={{ fontSize: 20, fontWeight: 900 }}>{sec.data.form.heading}</div>
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                      {sec.data.form.fields.name ? <input placeholder="Name" style={inp} /> : null}
                      {sec.data.form.fields.email ? <input placeholder="Email" style={inp} /> : null}
                      {sec.data.form.fields.phone ? <input placeholder="Phone" style={inp} /> : null}
                      {sec.data.form.fields.message ? <textarea placeholder="How can we help?" style={{ ...inp, minHeight: 90 }} /> : null}
                      <button style={{ ...inp, background: "var(--primary)", color: "white", fontWeight: 900, cursor: "pointer" }}>

                        {sec.data.form.submitText}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );

          case "intro":
            return (
              <section key={sec.id} style={{ padding: "44px 24px", borderBottom: "1px solid #eee" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                  <h2 style={{ fontSize: 32, fontWeight: 900 }}>{sec.data.h2}</h2>
                  <div style={{ marginTop: 12 }} dangerouslySetInnerHTML={{ __html: sec.data.content }} />
                </div>
              </section>
            );

          case "featureTabs": {
            const d = sec.data || {};
            return (
              <section key={sec.id} style={S.section}>
                <div style={S.container}>
                  {d.h2 ? <h2 style={S.h2}>{d.h2}</h2> : null}

                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 22 }}>
                    {(d.tabs || []).map((t: any) => (
                      <div key={t.key}>
                        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 10 }}>{t.label}</div>

                        <div style={S.featureGrid}>
                          {(t.items || []).map((it: any, idx: number) => (
                            <div key={idx} style={S.featureCard}>
                              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                {(it.iconUrl || it.icon || it.imageUrl || it.logoUrl) ? (
  <img src={(it.iconUrl || it.icon || it.imageUrl || it.logoUrl)} alt={it.title || "icon"} style={S.featureIcon} />
) : null}

                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 900, fontSize: 16 }}>{it.title}</div>
                                  {it.description ? (
                                    <div style={{ marginTop: 6, opacity: 0.78, lineHeight: 1.5 }}>{it.description}</div>
                                  ) : null}

                                  {it.linkUrl ? (
                                    <a
                                      href={it.linkUrl}
                                      target={it.openInNewTab ? "_blank" : "_self"}
                                      rel="noreferrer"
                                      style={S.anchor}
                                    >
                                      {it.linkText || "Learn more"} →
                                    </a>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          case "testimonials": {
            const d = sec.data || {};
            return (
              <section key={sec.id} style={S.section}>
                <div style={S.container}>
                  {d.h2 ? <h2 style={S.h2}>{d.h2}</h2> : null}

                  <div style={S.slider}>
                    {(d.items || []).map((t: any, idx: number) => (
                      <div key={idx} style={S.slideCard}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                          {t.avatarUrl ? <img src={t.avatarUrl} alt={t.name || "testimonial"} style={S.avatar} /> : null}
                          <div>
                            <div style={{ fontWeight: 900 }}>{t.name || ""}</div>
                            {t.role ? <div style={{ fontSize: 12, opacity: 0.75 }}>{t.role}</div> : null}
                          </div>
                        </div>
                        {t.quote ? <div style={{ opacity: 0.92, lineHeight: 1.65 }}>{t.quote}</div> : null}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 10, fontSize: 12, opacity: 0.6 }}>
                    Tip: swipe/scroll horizontally on mobile.
                  </div>
                </div>
              </section>
            );
          }

          case "techStack": {
            const d = sec.data || {};
            return (
              <section key={sec.id} style={S.section}>
                <div style={S.container}>
                  {d.h2 ? <h2 style={S.h2}>{d.h2}</h2> : null}

                  <div style={S.pillsWrap}>
                    {(d.items || []).map((it: any, idx: number) => (
                      <div key={idx} style={S.pill}>
                        {(it.iconUrl || it.icon || it.imageUrl || it.logoUrl) ? (
  <img
    src={(it.iconUrl || it.icon || it.imageUrl || it.logoUrl)}
    alt={it.name || "tech"}
    style={S.pillIcon}
  />
) : null}
<div style={{ fontWeight: 800 }}>{it.name}</div>

                        
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

 
                                
                                 
           
          case "faqs":
            return (
              <section key={sec.id} style={{ padding: "44px 24px", borderBottom: "1px solid #eee" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                  <h2 style={{ fontSize: 32, fontWeight: 900 }}>{sec.data.h2}</h2>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    {sec.data.faqs.map((f: any, idx: number) => (
                      <details key={idx} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                        <summary style={{ fontWeight: 900, cursor: "pointer" }}>{f.q}</summary>
                        <div style={{ marginTop: 8, opacity: 0.9 }}>{f.a}</div>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "finalCta":
            return (
              <section key={sec.id} style={{ padding: "44px 24px" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", border: "1px solid #eee", borderRadius: 16, padding: 18 }}>
                  <h2 style={{ fontSize: 28, fontWeight: 900 }}>{sec.data.h2}</h2>
                  {sec.data.subtext ? <p style={{ marginTop: 8, opacity: 0.85 }}>{sec.data.subtext}</p> : null}
                  <a href={sec.data.buttonUrl} style={{ display: "inline-block", marginTop: 12, padding: "12px 16px", borderRadius: 12, background: "var(--secondary)"
, color: "white", fontWeight: 900 }}>
                    {sec.data.buttonText}
                  </a>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}


const S: Record<string, React.CSSProperties> = {
  section: { padding: "56px 20px", borderBottom: "1px solid #f1f1f1" },
  container: { maxWidth: 1120, margin: "0 auto" },

  h2: { fontSize: 34, fontWeight: 900, letterSpacing: -0.3, marginBottom: 14 },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    padding: "12px 18px",
    borderRadius: 14,
    background: "var(--primary)",
    color: "white",
    fontWeight: 900,
    textDecoration: "none",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    maxWidth: 260,
  },

  anchor: {
    display: "inline-flex",
    marginTop: 10,
    fontWeight: 800,
    textDecoration: "none",
    color: "var(--primary)",
  },

  // Feature cards
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
  },
  featureCard: {
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 16,
    background: "white",
    boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    objectFit: "cover",
    border: "1px solid #eee",
    background: "#fff",
  },

  // Testimonials slider (mobile friendly)
  slider: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(260px, 1fr)",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 8,
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
  },
  slideCard: {
    scrollSnapAlign: "start",
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 16,
    background: "white",
    boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
    minHeight: 140,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    objectFit: "cover",
    border: "1px solid #eee",
    background: "#fff",
  },

  // Tech stack pills/grid
  pillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #eee",
    borderRadius: 999,
    padding: "10px 14px",
    background: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  },
  pillIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    objectFit: "cover",
    border: "1px solid #eee",
    background: "#fff",
  },
};

    
  
    
    

