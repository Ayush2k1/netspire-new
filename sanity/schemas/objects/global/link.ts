import { EarthGlobeIcon, LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
  title: "Link",
  name: "link",
  type: "object",
  icon: LinkIcon,
  fields: [
    // Title
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    // URL
    {
      name: "url",
      title: "URL",
      type: "string",
      description:
        'Internal link ("/products") Or External Link ("https://mysite.com")',
        validation: (Rule) => Rule.required()
    },
    // Open in a new window
    {
      title: "Open in a new window?",
      name: "newWindow",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
    },
    prepare(selection) {
      const { title, url } = selection;

      let subtitle = [];
      if (url) {
        subtitle.push(`${url}`);
      }

      return {
        // media: image,
        subtitle: subtitle.join(" "),
        title,
      };
    },
  },
});
