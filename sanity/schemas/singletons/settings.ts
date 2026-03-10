import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: "navigation",
      title: "Navigation",
    },
    {
      name: "logo",
      title: "Logo",
    },
    {
      name: "contact",
      title: "Contact",
    },
    {
      name: "footer",
      title: "Footer",
    },
  ],
  fields: [
    defineField({
      name: "menu",
      title: "Navbar",
      type: "menuSettings",
      group: "navigation",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "footerSettings",
      group: "navigation",
    }),
    defineField({
      name: "gradient",
      title: "Global Gradient",
      type: "reference",
      to: [{ type: "gradients" }],
    }),
    defineField({
      name: "logoDark",
      title: "Navbar Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
      group: "logo",
    }),
    defineField({
      name: "logoLight",
      title: "Footer Logo ",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
      group: "logo",
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "contact",
      group: "contact",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
