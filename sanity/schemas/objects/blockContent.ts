import { defineType, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";
import { ImageIcon } from "@sanity/icons";
import { CaseIcon } from "@sanity/icons";
import { DocumentTextIcon } from "@sanity/icons";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "string",
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      icon: ImageIcon,
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    {
      title: "Add team",
      name: "addTeam",
      icon: UsersIcon,
      type: "object",
      fields: [
        {
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
        },
      ],
      preview: {
        select: {
          team: "team",
        },
        prepare(selection) {
          const { team } = selection;
          team.map((member: any) => member.firstName);
          return {
            title: `Team: ${team.length} members`,
          };
        },
      },
    },
    {
      title: "Add Career",
      name: "addCareer",
      icon: CaseIcon,
      type: "object",
      fields: [
        {
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
        },
      ],
      preview: {
        select: {
          careers: "careers",
        },
        prepare(selection) {
          const { careers } = selection;
          careers.map((car: any) => car.jobTitle);
          return {
            title: `Careers: ${careers.length}`,
          };
        },
      },
    },
    {
      title: "Add Blog",
      name: "addBlogs",
      icon: DocumentTextIcon,
      type: "object",
      fields: [
        {
          name: "blogs",
          title: "Links blogs",
          type: "array",
          validation: (Rule) => Rule.required().min(1),
          of: [
            {
              type: "reference",
              to: [{ type: "blog" }],
              title: "Blog",
            },
          ],
        },
      ],
      preview: {
        select: {
          blogs: "blogs",
        },
        prepare(selection) {
          const { blogs } = selection;
          blogs.map((b: any) => b.title);
          return {
            title: `Blogs: ${blogs.length}`,
          };
        },
      },
    },
  ],
});
