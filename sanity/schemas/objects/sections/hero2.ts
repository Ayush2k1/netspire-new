import { defineField } from "sanity";
import { LayoutTemplate } from "lucide-react";

// @/sanity/schemas/sections/banner.tsx
export const hero2Section = {
  name: "block.hero2",
  title: "Hero 2",
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
      validation: (Rule) => Rule.required(),
    }),

    // defineField({
    //   name: "images",
    //   title: "Background Images",
    //   type: "array",
    //   of: [
    //     {
    //       type: "image",
    //       title: "Image",
    //     },
    //   ],
    // }),

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
