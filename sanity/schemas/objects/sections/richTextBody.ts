import { defineField } from "sanity";
import { ClipboardType } from "lucide-react";

export const richTextBody = {
  name: "block.richTextBody",
  type: "object",
  title: "Rich Text Body",
  icon: ClipboardType,
  options: {
    variants: [
      {
        assetUrl: "",
      },
    ],
  },
  fields: [
    defineField({
      name: "body",
      title: "Body",
      type: "ptBody",
    }),
  ],
  preview: {
    select: {
      title: "body",
      subtitle: "text",
    },
    prepare(selection: any) {
      const { title } = selection;
      return {
        title: "Rich Text Block",
      };
    },
  },
};
