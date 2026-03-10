import { defineField, defineType } from "sanity";

export default defineType({
  name: "accordion",
  type: "object",
  title: "Accordion",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
