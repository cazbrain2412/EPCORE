// src/lib/pagebuilder/section-types.ts
export type PageStatus = "draft" | "published";

export type SectionType =
  | "heroWithForm"
  | "intro"
  | "businessCards"
  | "featureTabs"
  | "richContent"
  | "costFactors"
  | "comparisonTable"
  | "whyChoose"
  | "processTimeline"
  | "caseStudies"
  | "testimonials"
  | "techStack"
  | "faqs"
  | "resources"
  | "finalCta";

export type SectionBase<T extends SectionType, D> = {
  id: string;            // uuid-like
  type: T;
  title?: string;        // shown in admin outline
  isHidden?: boolean;    // hide on site
  data: D;
};

export type RichText = string; // TipTap HTML

export type HeroWithFormData = {
  breadcrumb?: string; // "Home > Taxi App"
  h1: string;
  subtext: string; // short paragraph
  primaryCtaText: string;
  primaryCtaUrl: string;
  trustBadges?: { label: string; imageUrl?: string; linkUrl?: string }[];
  heroBgImageUrl?: string;

  form: {
    heading: string; // "Speak to an expert today"
    fields: {
      name: boolean;
      email: boolean;
      phone: boolean;
      message: boolean; // "Interested in / How can we help?"
    };
    submitText: string; // "Send Now"
    successMessage: string;
    notifyEmail?: string; // optional
  };
};

export type IntroData = {
  h2: string;
  content: RichText;
};

export type BusinessCardsData = {
  h2: string;
  cards: { title: string; description?: string; iconUrl?: string; linkUrl?: string }[];
};

export type FeatureTabsData = {
  h2: string;
  tabs: {
    key: "user" | "driver" | "admin";
    label: string;
    items: {
      title: string;
      iconUrl?: string;
      description?: string;
      linkText?: string;
      linkUrl?: string;
      openInNewTab?: boolean;
    }[];
  }[];
};

export type RichContentData = {
  h2?: string;
  content: RichText;
};

export type CostFactorsData = {
  h2: string;
  bullets: string[];
};

export type ComparisonTableData = {
  h2: string;
  leftTitle: string;
  rightTitle: string;
  rows: { feature: string; left: string; right: string }[];
};

export type WhyChooseData = {
  h2: string;
  bullets: string[];
};

export type ProcessTimelineData = {
  h2: string;
  steps: { title: string; description?: string }[];
};

export type CaseStudiesData = {
  h2: string;
  items: { title: string; description?: string; imageUrl?: string; linkUrl?: string }[];
};

export type TestimonialsData = {
  h2: string;
  items: { name: string; role?: string; company?: string; quote: string; imageUrl?: string }[];
};

export type TechStackData = {
  h2: string;
  tabs: {
    label: string; // Frontend / Backend / Database / Cloud ...
    items: string[];
  }[];
};

export type FaqsData = {
  h2: string;
  faqs: { q: string; a: string }[];
  enableSchema: boolean;
};

export type ResourcesData = {
  h2: string;
  items: { title: string; description?: string; linkUrl: string }[];
};

export type FinalCtaData = {
  h2: string;
  subtext?: string;
  buttonText: string;
  buttonUrl: string;
};

export type AnySection =
  | SectionBase<"heroWithForm", HeroWithFormData>
  | SectionBase<"intro", IntroData>
  | SectionBase<"businessCards", BusinessCardsData>
  | SectionBase<"featureTabs", FeatureTabsData>
  | SectionBase<"richContent", RichContentData>
  | SectionBase<"costFactors", CostFactorsData>
  | SectionBase<"comparisonTable", ComparisonTableData>
  | SectionBase<"whyChoose", WhyChooseData>
  | SectionBase<"processTimeline", ProcessTimelineData>
  | SectionBase<"caseStudies", CaseStudiesData>
  | SectionBase<"testimonials", TestimonialsData>
  | SectionBase<"techStack", TechStackData>
  | SectionBase<"faqs", FaqsData>
  | SectionBase<"resources", ResourcesData>
  | SectionBase<"finalCta", FinalCtaData>;

export type SeoFields = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  noIndex?: boolean;
};

export type PageDocShape = {
  _id: string;
  title: string;
  status: PageStatus;
  seo: SeoFields;
  sections: AnySection[];
  updatedAt: string;
  publishedAt?: string;
};

