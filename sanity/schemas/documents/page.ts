import { defineField } from "sanity";
import { LayoutTemplate } from "lucide-react";
import sections from "../objects/sections";

export default {
  name: "page",
  type: "document",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the title",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionPicker",
      title: "Section Picker",
      type: "array",
      of: sections.map((section) => ({
        type: section.name,
      })),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare(selection: { title?: string; subtitle?: string }) {
      return {
        title: selection.title,
        subtitle: selection.subtitle
          ? `Path: ${selection.subtitle}`
          : undefined,
      };
    },
  },
};
