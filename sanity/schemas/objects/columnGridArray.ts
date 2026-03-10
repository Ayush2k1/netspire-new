import { Image } from "sanity";

export default {
  title: "Column Grid Array",
  name: "columnGridArray",
  type: "object",
  fields: [
    {
      title: "Column Grid Item",
      name: "columnGridItem",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "text",
          title: "Text",
          type: "text",
        },
        {
          name: "image",
          title: "Image",
          type: "image",
        },
        {
          name: "cta",
          title: "Call To Action",
          type: "link",
        },
      ],
    },
  ],
  preview: {
    select: {
      image: "columnGridItem.image",
      title: "columnGridItem.heading",
      subtitle: "text",
    },
    prepare(selection: { title: string; subtitle: string; image: Image }) {
      const { title, subtitle, image } = selection;
      return {
        media: image,
        title: title,
        subtitle: subtitle,
      };
    },
  },
};
