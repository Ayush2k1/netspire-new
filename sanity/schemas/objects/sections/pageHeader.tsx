import { defineField } from "sanity";
import { PanelTop } from "lucide-react";

export const pageHeader = {
  name: "block.pageHeader",
  title: "Page Header",
  type: "object",
  icon: PanelTop,
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
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare(selection: any) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  },
};
