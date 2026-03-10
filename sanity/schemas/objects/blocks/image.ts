import { imageWithAltField } from "@/sanity/lib/image-with-alt-field";
import { defineField } from "sanity";

export const imageBlock = defineField({
  fields: [
    {
      ...imageWithAltField,
      name: "image",
      options: {
        hotspot: true,
      },
    },
  ],

  preview: {
    select: {
      team: "team",
    },
    prepare() {
      return {
        title: "Image",
      };
    },
  },

  name: "imageBlock",
  title: "Image",
  type: "object",
});
