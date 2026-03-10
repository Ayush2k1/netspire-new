import { defineField } from "sanity";

export default defineField({
  name: "menuSettings",
  title: "Menu",
  type: "object",
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "menuLinks",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
});
