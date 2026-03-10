export default {
  title: "Contact",
  name: "contact",
  type: "object",
  fields: [
    {
      title: "Contact Information",
      name: "contact",
      type: "object",
      fields: [
        {
          name: "streetAddress",
          description: "Enter your street address",
          title: "Street Address",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "city",
          description: "Enter city name",
          title: "City",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "province",
          description: "Enter province name",
          title: "Province",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "country",
          description: "Enter country name",
          title: "Country",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "postalCode",
          description: "Enter postal code",
          title: "Postal Code",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "phone",
          description: "Enter phone number",
          title: "Phone Number",
          type: "number",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "email",
          description: "Enter your email",
          title: "Email",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "fax",
          description: "Enter your fax number",
          title: "Fax Number",
          type: "string",
        },
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "content",
        },
        prepare(selection: any) {
          const { title, subtitle } = selection;
          return {
            title: title,
            subtitle: subtitle,
          };
        },
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "content",
    },
    prepare(selection: any) {
      return {
        title: "Contact",
      };
    },
  },
};
