import { defineField } from "sanity";

export default defineField({
  name: "footerSettings",
  title: "Footer",
  type: "object",
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Links
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      validation: (Rule) => Rule.required().max(2),
      of: [{ type: "footerLinkGroup" }],
    }),
  ],
});
