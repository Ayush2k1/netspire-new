import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export default defineType({
  name: "teamConfig",
  title: "Page Configuration",
  icon: Settings,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Header Title",
      description: "The title of the page header",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gradient",
      title: "Page Header Gradient",
      description: "The background gradient for the page header",
      type: "reference",
      to: [
        {
          type: "gradients",
          title: "Gradients",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
    }),
  ],
});
