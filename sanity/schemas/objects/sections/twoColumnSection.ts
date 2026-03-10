import { defineField } from "sanity";
import { Columns2 } from "lucide-react";

export const twoColumnSection = {
  name: "block.twoColumn",
  title: "Two column",
  type: "object",
  icon: Columns2,
  options: {
    variants: [
      {
        assetUrl: "",
      },
    ],
  },
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "inverted",
      title: "Inverted",
      description: "Invert the order of the image and text section",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "text",
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle,
      };
    },
  },
};
