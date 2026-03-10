import { defineField, defineType } from "sanity";
import { FileImage } from "lucide-react";

export const imageAccordionSection = {
  name: "block.imageAccordion",
  type: "object",
  title: "Image accordion",
  icon: FileImage,
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
      name: "button",
      title: "Button",
      type: "link",
    }),

    defineField({
      name: "imageAccordion",
      title: "Accordion with image",
      type: "array",
      of: [{ type: "imageAccordion" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
};
