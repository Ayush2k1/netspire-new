import {defineField, defineType} from 'sanity'
import { SquareLibrary } from "lucide-react";

export default defineType({
  name: 'category',
  title: 'Category',
  icon:SquareLibrary,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
