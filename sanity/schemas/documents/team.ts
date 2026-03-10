import { defineField, defineType } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "team",
  title: "Team",
  type: "document",
  icon: Users,
  fields: [
    defineField({
      name: "gradient",
      title: "Select gradient",
      type: "reference",
      to: [
        {
          type: "gradients",
          title: "Gradients",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the team member name",
      options: {
        source: (doc: any) =>
          `${doc.firstName || ""} ${doc.lastName || ""}`.trim(),
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "reference",
      to: [
        {
          type: "positions",
          title: "Position",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "number",
    }),
    defineField({
      name: "linkdin",
      title: "LinkedIn",
      type: "url",
    }),
  ],

  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      position: "position.position",
      media: "image",
    },
    prepare(selection: {
      firstName?: string;
      lastName?: string;
      position?: string;
      media?: any;
    }) {
      const { firstName, lastName, media, position } = selection;

      return {
        title: `${firstName || ""} ${lastName || ""}`.trim(),
        subtitle: position,
        media: media,
      };
    },
  },
});
