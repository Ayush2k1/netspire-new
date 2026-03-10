import { defineField } from "sanity";

const seoField = defineField({
  group: "settings",
  name: "seoField",
  options: { collapsed: false, collapsible: true },
  title: "SEO & social",
  type: "seo",
});
export default seoField;
