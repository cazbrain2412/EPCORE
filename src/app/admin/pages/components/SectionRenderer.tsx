import HeroLeadForm from "./sections/HeroLeadForm";
import SplitMedia from "./sections/SplitMedia";
import FAQ from "./sections/FAQ";

export default function SectionRenderer({ section }) {
  switch (section.type) {
    case "hero_lead_form":
      return <HeroLeadForm {...section} />;
    case "split_media":
      return <SplitMedia {...section} />;
    case "faq":
      return <FAQ {...section} />;
    default:
      return null;
  }
}

