import mongoose, { Schema } from "mongoose";

const SeoSchema = new Schema(
  {
    slug: { type: String, required: true, index: true },
    metaTitle: { type: String, required: true, default: "" },
    metaDescription: { type: String, required: true, default: "" },
    canonicalUrl: { type: String, default: "" },
    ogImageUrl: { type: String, default: "" },
    noIndex: { type: Boolean, default: false },
  },
  { _id: false }
);

const ThemeSchema = new Schema(
  {
    primary: { type: String, default: "#f58220" },   // orange
    secondary: { type: String, default: "#111111" }, // dark
  },
  { _id: false }
);

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },

    title: { type: String, required: true },
    status: { type: String, enum: ["draft", "published", "trash"], default: "draft" },

    seo: { type: SeoSchema, required: true },
    theme: { type: ThemeSchema, default: () => ({}) },

    sections: { type: [Schema.Types.Mixed], default: [] },

    publishedAt: { type: Date },
    trashedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model("Page", PageSchema);
