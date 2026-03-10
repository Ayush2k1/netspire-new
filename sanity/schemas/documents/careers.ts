import { defineField } from "sanity";
import { BriefcaseBusiness } from "lucide-react";

export default {
  name: "careers",
  title: "Careers",
  type: "document",
  icon: BriefcaseBusiness,
  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the job title",
      options: {
        source: "jobTitle",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gradient",
      title: "Select gradient",
      type: "reference",
      to: [
        {
          type: "gradients",
          title: "Gradients",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobShortDescription",
      title: "Job Short Description",
      type: "text",
      validation: (rule) => rule.required().min(10).max(150),
    }),
    defineField({
      name: "jobLocation",
      title: "Job Location",
      type: "string",
    }),
    defineField({
      name: "jobType",
      title: "Job type",
      type: "string",
      options: {
        list: [
          { title: "Part-time/Full-time", value: "Part-time/Full-time" },
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
        ],
      },
    }),
    defineField({
      name: "applicationDeadline",
      title: "Application Deadline",
      type: "date",
    }),
    defineField({
      name: "jobDescription",
      title: "Job Description",
      type: "lightPtBody",
    }),
  ],

  preview: {
    select: {
      title: "jobTitle",
      media: "image",
    },
    prepare(selection: { title?: string; media?: any }) {
      return { ...selection };
    },
  },
};