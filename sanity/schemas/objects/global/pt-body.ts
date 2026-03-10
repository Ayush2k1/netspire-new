import { defineArrayMember, defineField } from "sanity";
import { imageBlock } from "../blocks/image";
import { DocumentTextIcon } from "@sanity/icons";
import { addTeamBlock } from "../blocks/team";
import { addCareerBlock } from "../blocks/career";
import { addBlogsBlock } from "../blocks/blog";

const ptBlocks = [imageBlock, addTeamBlock, addCareerBlock, addBlogsBlock];

const STYLE_LABELS = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  blockquote: "Quote",
};

export const availableStyles = ["h1", "h2", "h3", "h4", "blockquote"];

export const ptBody = defineField({
  name: "ptBody",
  of: [
    defineArrayMember({
      lists: [
        { title: "Bullet list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike-through", value: "strike" },
        ],
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
      styles: availableStyles.length
        ? [
            ...availableStyles.map((h) => ({
              title: STYLE_LABELS[h as keyof typeof STYLE_LABELS] || h,
              value: h,
            })),
            { title: "Paragraph", value: "normal" },
          ]
        : [],
      type: "block",
    }),
    ...ptBlocks.map((type) => defineArrayMember({ ...type, name: type.name })),
  ],

  title: "Rich Text with blocks",
  type: "array",
});

export const lightPtBody = defineField({
  name: "lightPtBody",
  of: [
    defineArrayMember({
      lists: [],
      marks: {
        annotations: [],
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
      },
      styles: [{ title: "Paragraph", value: "normal" }],
      type: "block",
    }),
  ],

  title: "Rich Text",
  type: "array",
});
