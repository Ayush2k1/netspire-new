import { defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const addTeamBlock = defineField({
  name: "addTeam",
  title: "Add team",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "team",
      title: "Link team members",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "reference",
          to: [{ type: "team" }],
          title: "Member",
        },
      ],
    }),
  ],
  preview: {
    select: {
      team: "team",
    },
    prepare(selection) {
      const { team } = selection;
      const count = Array.isArray(team) ? team.length : 0;
      return {
        title: `Team: ${count} member${count === 1 ? "" : "s"}`,
      };
    },
  },
});
