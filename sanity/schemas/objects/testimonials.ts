import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonials",
  type: "object",
  title: "Testimonials",
  fields: [
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
