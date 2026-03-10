const shouldShow = (document: any) => {
  return document.showFeatureLinks === true;
};

export default {
  name: "navLinkGroup",
  title: "Nav Link Group",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "navLinks",
      title: "Nav Links",
      description: "Navigation Link Groups. Max(5) ",
      validation: (Rule: any) => Rule.required().min(1).max(5),
      type: "array",
      of: [
        {
          type: "object",
          name: "navLinkGroups",

          fields: [
            {
              name: "linkGroupHeading",
              title: "Link Group Heading",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "Links",
              title: "Links",
              description: "Navigation Links. Max(10) ",
              type: "array",
              validation: (Rule: any) => Rule.required().max(10),
              of: [{ type: "link" }],
            },
          ],
          preview: {
            select: {
              title: "linkGroupHeading",
              links: "Links",
            },
            prepare(selection: any) {
              const { title, links } = selection;

              const linkCount = links ? links.length : 0;
              const subtitle =
                linkCount > 0 ? `${linkCount} links` : "No links";

              return {
                title: title || "No Group Heading",
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "heading",
      totalLinks: "navLinks",
    },
    prepare(selection: any) {
      const { title, totalLinks } = selection;
      const toatalLinks =
        totalLinks && totalLinks.length > 0
          ? `Total Groups: ${totalLinks.length}`
          : "Total Groups: 0";

      const subtitle = `${toatalLinks}`;
      return {
        title,
        subtitle,
      };
    },
  },
};
