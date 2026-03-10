import { defineField } from "sanity";
import { Award } from "lucide-react";

export const featuredLogos = {
  name: "block.featuredLogos",
  type: "object",
  title: "Featured Logos",
  icon: Award,
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
      name: "images",
      title: "Images",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        },
      ],
    }),
  ],
};
