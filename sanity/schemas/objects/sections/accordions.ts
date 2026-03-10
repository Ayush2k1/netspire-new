import { defineField } from "sanity";
import { List } from "lucide-react";

export const accrodionSection = {
  name: "block.accordions",
  type: "object",
  title: "Accordions",
  icon: List,
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
      name: "accordions",
      title: "Accordions",
      type: "array",
      of: [{ type: "accordion" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    // defineField({
    //   name: "primaryCta",
    //   title: "Primary CTA",
    //   type: "link",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "secondaryCta",
    //   title: "Secondary CTA",
    //   type: "link",

    // }),
  ],
};
