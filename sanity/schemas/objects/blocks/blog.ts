import { defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const addBlogsBlock = defineField({
  name: "addBlogs",
  title: "Add Blog",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "blogs",
      title: "Link blogs",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "reference",
          to: [{ type: "blog" }],
          title: "Blog",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Blogs Block",
      };
    },
  },
});
