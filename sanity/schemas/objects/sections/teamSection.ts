import { defineField } from "sanity";
import { Users } from "lucide-react";

export const teamSection = {
  name: "block.team",
  title: "Team",
  type: "object",
  icon: Users,
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
      name: "members",
      title: "Select members",
      type: "array",
      validation: (Rule: any) => Rule.required().min(1).max(10),
      of: [
        {
          name: "members",
          type: "reference",
          to: [
            {
              type: "team",
              title: "Team",
            },
          ],
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
