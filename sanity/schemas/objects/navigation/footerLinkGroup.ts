import { Link, LinkIcon } from "lucide-react";

export default {
  name: "footerLinkGroup",
  title: "Footer Link Group",
  icon: LinkIcon,
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "link",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "heading",
      links: "links",
    },
    prepare(selection: any) {
      const { title, links } = selection;
      const subtitle =
        links && links.length > 0 ? `Links: ${links.length}` : "No links";
      return {
        title,
        subtitle,
      };
    },
  },
};
