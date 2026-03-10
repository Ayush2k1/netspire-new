import { defineField, defineType } from "sanity";

export default defineType({
  name: "serviceCards",
  title: "Service cards",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    {
      name: "gradient",
      title: "Select gradient",
      type: "reference",
      to: [
        {
          type: "gradients",
          title: "Gradients",
        },
      ],
    },
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      description:
        'Internal link ("/products") Or External Link ("https://mysite.com")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subHeading",
      title: "Sub heading",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
