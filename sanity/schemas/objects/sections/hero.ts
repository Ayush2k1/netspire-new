import { defineField } from "sanity";
import { LayoutTemplate } from "lucide-react";

export const heroSection = {
  name: "block.hero",
  title: "Hero",
  type: "object",
  icon: LayoutTemplate,
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
      name: "subHeading",
      title: "Sub Heading",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gradient",
      title: "Select gradient",
      type: "reference",
      to: [
        {
          type: "gradients",
          title: "Gradients",
        },
      ],
      //validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "link",
    }),
  ],
};
