import { defineField, defineType } from "sanity";
import { Rss } from "lucide-react";
import NewsletterCustomInput from "@/sanity/CustomInputFields/NewsletterCustomInput";

export default defineType({
  name: "newsletterSubmissions",
  title: "Newsletter Form Submissions",
  icon: Rss,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      hidden: true,
    }),

    defineField({
      name: "subTitle",
      title: "Subtitle",
      type: "string",
      hidden: true,
    }),

    defineField({
      name: "newsletter",
      title: "Newsletter Form Submission",
      type: "object",
      options: {
        collapsible: false,
        collapsed: false,
      },
      components: {
        input: NewsletterCustomInput,
      },
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "name",
          title: "Name",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subTitle",
    },
    prepare(selection) {
      const { title, subtitle } = selection;

      return { title: title, subtitle: `Submitted on ${subtitle}` };
    },
  },
});
