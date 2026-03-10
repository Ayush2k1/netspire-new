import { defineField } from "sanity";
import { Star } from "lucide-react";

export const testimonialsSection = {
  name: "block.testimonials",
  title: "Testimonials",
  type: "object",
  icon: Star,
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
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      validation: (Rule: any) => Rule.required(),
      of: [
        {
          name: "testimonials",
          type: "testimonials",
        },
      ],
    },
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
