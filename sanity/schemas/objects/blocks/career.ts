import { defineField } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const addCareerBlock = defineField({
  name: "addCareer",
  title: "Add Career",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "careers",
      title: "Link career",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "reference",
          to: [{ type: "careers" }],
          title: "Career",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Carrers Block",
      };
    },
  },
});
