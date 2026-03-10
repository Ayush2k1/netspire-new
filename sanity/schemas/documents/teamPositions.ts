import { defineField, defineType } from "sanity";
import { ContactRound } from "lucide-react";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export default defineType({
  name: "positions",
  title: "Positions",
  icon: ContactRound,
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    // Minimum required configuration
    orderRankField({ type: "positions", newItemPosition: "before" }),

    defineField({
      name: "position",
      title: "Position",
      description:
        "The position of the team member, you can reference this in the all team members document",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      position: "position",
    },
    prepare(selection) {
      const { position } = selection;

      return {
        title: position,
      };
    },
  },
});
