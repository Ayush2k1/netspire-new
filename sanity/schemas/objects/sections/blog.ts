import { defineField } from "sanity";
import { ScrollText } from "lucide-react";

export const blogSection = {
  name: "block.blog",
  title: "Blog",
  type: "object",
  icon: ScrollText,
  options: {
    variants: [
      {
        assetUrl: "",
      },
    ],
  },
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    {
      name: "blog",
      title: "Select blog",
      type: "array",
      validation: (Rule: any) => Rule.required(),
      of: [
        {
          name: "blog",
          type: "reference",
          to: [
            {
              type: "blog",
              title: "Blog",
            },
          ],
        },
      ],
    },
  ],
};
