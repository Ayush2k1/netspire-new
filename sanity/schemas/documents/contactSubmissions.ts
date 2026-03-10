import { defineField, defineType } from "sanity";
import { MailPlus, SquareLibrary } from "lucide-react";
import ContactCustomInput from "@/sanity/CustomInputFields/ContactCustomInput";

export default defineType({
  name: "contactSubmissions",
  title: "Contact Form Submissions",
  icon: MailPlus,
  type: "document",
  options: {},
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
      name: "contact",
      title: "Contact Form Submission",
      type: "object",
      options: {
        collapsible: false,
        collapsed: false,
      },
      components: {
        input: ContactCustomInput,
      },
      fields: [
        defineField({
          name: "firstName",
          title: "First Name",
          type: "string",
        }),
        defineField({
          name: "lastName",
          title: "Last Name",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "subject",
          title: "Subject",
          type: "string",
        }),
        defineField({
          name: "message",
          title: "Message",
          type: "text",
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
