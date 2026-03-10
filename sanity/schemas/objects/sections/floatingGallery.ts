import { defineField } from "sanity";
import { Images, Star } from "lucide-react";

export const floatingGallery = {
  name: "block.floatingGallery",
  title: "Floating Gallery",
  type: "object",
  icon: Images,
  options: {
    variants: [
      {
        assetUrl: "",
      },
    ],
  },
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "The sticky background heading for this section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "Images for the gallery. Min(3). Max(10)",
      validation: (Rule) => Rule.required().min(3).max(10),
      of: [
        {
          name: "image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "images",
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: `${subtitle.length} images`,
      };
    },
  },
};
