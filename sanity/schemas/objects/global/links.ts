import { defineField } from "sanity";

export default defineField({
  name: "menuLinks",
  title: "menuLinks",
  type: "array",
  of: [
    // {
    //   name: 'collectionGroup',
    //   title: 'Collection group',
    //   type: 'collectionGroup',
    // },
    // {type: 'linkInternal'},
    // {type: 'linkExternal'},
    { type: "multipleLinks", title: "Multiple Links (dropdown)" },
    { type: "link", title: "Single Link" },
  ],
});
