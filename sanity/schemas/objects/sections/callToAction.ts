import { defineField } from "sanity";
import { MousePointerClick } from "lucide-react";

export const callToActionSection = {
  name: "block.callToAction",
  type: "object",
  title: "Call To Action",
  icon: MousePointerClick,
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
      name: "body",
      title: "Body",
      type: "text",
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
      name: "primaryCta",
      title: "Primary CTA",
      type: "link",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "link",
    }),
  ],
};
