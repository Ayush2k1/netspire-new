import { CubeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "multipleLinks",
  type: "object",
  title: "Multiple Links",
  icon: CubeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  },
});
