// src/lib/pagebuilder/defaults.ts
import slugify from "slugify";
import type { AnySection, PageDocShape } from "./section-types";

const id = () => `sec_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;

export function makeDefaultPage(title = "New Page"): Omit<PageDocShape, "_id" | "updatedAt"> {
  const slug = slugify(title, { lower: true, strict: true });

  const sections: AnySection[] = [
    {
      id: id(),
      type: "heroWithForm",
      title: "Hero + Form",
      data: {
        breadcrumb: "Home > Service",
        h1: title.toUpperCase(),
        subtext: "Write a short SEO intro paragraph here.",
        primaryCtaText: "BOOK A FREE CALL",
        primaryCtaUrl: "/contact",
        trustBadges: [],
        heroBgImageUrl: "",
        form: {
          heading: "Speak to an expert today",
          fields: { name: true, email: true, phone: true, message: true },
          submitText: "SEND NOW",
          successMessage: "Thanks! We will contact you shortly.",
          notifyEmail: "",
        },
      },
    },
    {
      id: id(),
      type: "intro",
      title: "Intro",
      data: { h2: "About this service", content: "<p>Write your intro here.</p>" },
    },
    {
      id: id(),
      type: "featureTabs",
      title: "Features (User/Driver/Admin)",
      data: {
        h2: "Main Features",
        tabs: [
          { key: "user", label: "User", items: [] },
          { key: "driver", label: "Driver", items: [] },
          { key: "admin", label: "Admin", items: [] },
        ],
      },
    },
    {
      id: id(),
      type: "faqs",
      title: "FAQs",
      data: { h2: "FAQs", faqs: [], enableSchema: true },
    },
    {
      id: id(),
      type: "finalCta",
      title: "Final CTA",
      data: { h2: "Ready to start?", subtext: "Let’s discuss your project.", buttonText: "CONTACT US", buttonUrl: "/contact" },
    },
  ];

  return {
    title,
    status: "draft",
    seo: {
      slug,
      metaTitle: title,
      metaDescription: "Write your SEO meta description.",
      canonicalUrl: "",
      ogImageUrl: "",
      noIndex: false,
    },
    sections,
    publishedAt: undefined,
  };
}

