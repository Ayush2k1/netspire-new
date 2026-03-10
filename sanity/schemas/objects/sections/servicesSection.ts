import { Briefcase } from "lucide-react";
import { defineField } from "sanity";

export const servicesSection = {
  name: "block.services",
  title: "Services",
  type: "object",
  icon: Briefcase,
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
      title: "Sub heading",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "serviceCards",
      title: "Service cards",
      type: "array",
      validation: (Rule: any) => Rule.required().min(1).max(10),
      of: [
        {
          name: "serviceCards",
          type: "serviceCards",
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
