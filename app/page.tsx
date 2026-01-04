// src/app/page.tsx
export const metadata = {
  title: "Epicore ERP - Cloud ERP & Business Solutions",
  description:
    "Epicore Technology — Cloud ERP, inventory, accounting, manufacturing, HR, CRM and AI voice agents. 450+ projects, 25,000+ users.",
};

const FAQ_ITEMS = [
  {
    q: "What makes Epicore different from other ERP providers?",
    a: "Epicore combines deep implementation experience (450+ projects), pre-built industry templates and AI capabilities, so businesses go live faster with less risk.",
  },
  {
    q: "How long does implementation take?",
    a: "Typical timelines: SMEs 2–4 weeks, Enterprise 4–8 weeks — using pre-configured industry templates and a proven implementation methodology.",
  },
  {
    q: "Is training and support included?",
    a: "Yes. We provide onboarding, role-based training and 24x7 support with dedicated account managers.",
  },
];

const PARTNERS = ["Tata", "Reliance", "Wipro", "Apollo", "Mahindra", "HCL"];

const TESTIMONIALS = [
  {
    name: "Ravi Kumar, COO",
    org: "Acme Manufacturing",
    quote: "Epicore helped us standardize operations across 12 plants. ROI in 8 weeks."
  },
  {
    name: "Neha Singh, CFO",
    org: "HealthPlus Clinics",
    quote: "Accounting & GST automation saved us countless hours. Their team is excellent."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-gray-50 text-sm text-gray-600 mb-6">
            450+ Projects Delivered • 25,000+ Users • 50+ Countries • 99.9% Uptime
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-gray-900">
            Transform Your Business with AI-Powered Cloud ERP
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Epicore delivers enterprise cloud ERP, inventory, accounting, manufacturing, HR and CRM modules — powered by AI voice agents and built for fast implementation and measurable ROI.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a className="rounded-full bg-black text-white px-8 py-3 text-lg shadow hover:opacity-95">See Live Demo (15 min)</a>
            <a className="rounded-full border border-gray-300 px-8 py-3 text-lg hover:bg-gray-50">Start Free 30-Day Trial</a>
            <a className="rounded-full border border-gray-200 px-6 py-3 text-sm hover:bg-gray-50">View Success Stories</a>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Client logos: {PARTNERS.join(" • ")}
          </div>
        </div>
      </section>

      {/* CORE MODULES */}
      <section className="py-16 bg-[radial-gradient(circle_at_top,_#f9fafb,_#ffffff)]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Full-Cycle Digital Solutions — From Idea to Implementation</h2>
          <p className="text-gray-600 max-w-3xl">Complete business transformation through integrated modules. We handle everything from requirements gathering to post-launch support.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <h3 className="text-xl font-semibold mb-2">Cloud ERP Suite</h3>
              <p className="text-gray-600">Unified operations, real-time analytics, GST & multi-location ready.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <h3 className="text-xl font-semibold mb-2">Financial & Accounting ERP</h3>
              <p className="text-gray-600">Automate bookkeeping, GST filing and bank reconciliation with AI insights.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-gray-600">Multi-location tracking, AI demand forecasting and voice-driven operations.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <span>Plus HR & Payroll, CRM & Sales, POS, Asset Management and more.</span>
            <a className="underline">Explore all modules →</a>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3">Industry-Specific Solutions</h2>
          <p className="text-gray-600 max-w-3xl">Manufacturing, Retail, Healthcare, Pharma, Education, Logistics and more — with templates and compliance built-in.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <h4 className="font-semibold mb-1">Manufacturing</h4>
              <p className="text-sm text-gray-600">Production planning, quality control, IoT integration and real-time OEE tracking.</p>
            </article>
            <article className="p-6 rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <h4 className="font-semibold mb-1">Healthcare & Pharma</h4>
              <p className="text-sm text-gray-600">Patient and inventory workflows, regulatory compliance and secure integrations.</p>
            </article>
            <article className="p-6 rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <h4 className="font-semibold mb-1">Retail & Distribution</h4>
              <p className="text-sm text-gray-600">Omnichannel inventory, POS integration and real-time analytics across locations.</p>
            </article>
          </div>

          <div className="mt-8 text-center">
            <a className="inline-block px-6 py-3 rounded-full border text-sm">View all 20+ industries →</a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why 25,000+ Businesses Trust Epicore</h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>• 450+ successful projects • 25,000+ daily users • 50+ countries • 99.9% uptime.</li>
              <li>• Full-cycle engagement: requirements, design, development, testing, deployment, support.</li>
              <li>• Modern stack: cloud-native, microservices, AI/ML, 50+ integrations and mobile apps.</li>
              <li>• Transparent process: fixed timelines, clear milestones, no hidden costs.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
              <h3 className="font-semibold mb-1">Proven Results</h3>
              <p className="text-sm text-gray-600">Up to 40% cost reduction, 70% efficiency improvement and ROI typically within 6 months.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
              <h3 className="font-semibold mb-1">Industry Recognition</h3>
              <p className="text-sm text-gray-600">Recognized by leading industry bodies (Gartner, NASSCOM, G2).</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3">Built on Modern Technology for Future-Ready Business</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Cloud Infrastructure</h3>
              <ul className="space-y-1">
                <li>• Platforms: AWS, Azure, Google Cloud</li>
                <li>• Auto-scaling & load balancing</li>
                <li>• WAF, DDoS protection & backups</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Development Stack</h3>
              <ul className="space-y-1">
                <li>• Frontend: React, Angular, Vue</li>
                <li>• Backend: Node.js, Python, Java</li>
                <li>• Mobile: React Native, Flutter</li>
                <li>• Databases: PostgreSQL, MongoDB, Redis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Integration Ecosystem</h3>
              <ul className="space-y-1">
                <li>• Payments: Razorpay, PayU, Stripe</li>
                <li>• SMS/Email: Twilio, SendGrid</li>
                <li>• E-commerce & logistics platforms</li>
                <li>• Banking APIs: HDFC, ICICI, SBI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3">Multiple Ways to Work With Us</h2>
          <p className="text-gray-600 max-w-3xl">Choose the engagement model that fits your business — from staff augmentation to full managed services.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">Staff Augmentation</h3>
              <p className="text-sm">Hire dedicated consultants and developers with flexible duration and direct control.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">Project Outsourcing</h3>
              <p className="text-sm">End-to-end ERP implementation with fixed scope, clear timelines and single accountability.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">Managed Services</h3>
              <p className="text-sm">Complete ERP management with 24x7 support, updates and performance monitoring.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">Hybrid Model</h3>
              <p className="text-sm">Best of both worlds with shared responsibility and flexible scaling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3">Our Proven Implementation Methodology</h2>
          <p className="text-gray-600 max-w-3xl">Structured 5-phase approach that delivers predictable timelines and successful adoption.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-gray-700">
            <div className="p-4 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">1. Discovery</h3>
              <p>Process study, requirements, gap analysis and project planning.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">2. Design</h3>
              <p>Solution architecture, configuration and integration design.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">3. Build</h3>
              <p>Custom development, data migration, integrations and testing.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">4. Go-Live</h3>
              <p>Deployment, training, documentation and go-live support.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">5. Support</h3>
              <p>24x7 support, optimization, enhancements and scaling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3">Insights, Guides & Industry Trends</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">How to Achieve ERP Success in 30 Days</h3>
              <p className="text-sm text-gray-600">Implementation best practices from 450+ projects.</p>
            </article>
            <article className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">AI in ERP: Beyond the Hype</h3>
              <p className="text-sm text-gray-600">Real use cases and ROI examples for AI in ERP.</p>
            </article>
            <article className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold mb-1">True Cost of ERP Implementation</h3>
              <p className="text-sm text-gray-600">Understand hidden costs and how to budget correctly.</p>
            </article>
          </div>
          <div className="mt-6 flex justify-between items-center text-sm">
            <a className="underline">Visit Blog →</a>
            <a className="underline">Subscribe to Newsletter →</a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">Trusted by leading brands</h3>
          <div className="flex items-center justify-center gap-8 flex-wrap text-gray-400">
            {PARTNERS.map((p) => <div key={p} className="px-4 py-2">{p}</div>)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">What our customers say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white shadow-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500 mb-3">{t.org}</div>
                <div className="text-gray-700">{t.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (short) */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((f, i) => (
              <details key={i} className="p-5 rounded-xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <div className="mt-3 text-gray-600 text-sm">{f.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-6 text-right">
            <a className="text-sm underline">View complete FAQ →</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA / CONTACT */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-3">Ready to Transform Your Business?</h3>
          <p className="text-gray-600 mb-6">Book a demo, start a free trial or talk to our experts.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a className="rounded-full bg-black text-white px-6 py-3">Schedule a Demo</a>
            <a className="rounded-full border px-6 py-3">Start Free Trial</a>
            <a className="rounded-full border px-6 py-3">Talk to Expert</a>
          </div>
        </div>
      </section>
    </main>
  );
}

