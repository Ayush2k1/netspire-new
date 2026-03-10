import { defineField } from "sanity";
import { Pipette } from "lucide-react";
//import TWallpaper from "@twallpaper/react";

export default {
  name: "gradients",
  title: "Gradients",
  type: "document",
  icon: Pipette,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "colorPicker1",
      title: "Color 1",
      type: "color",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "colorPicker2",
      title: "Color 2",
      type: "color",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "colorPicker3",
      title: "Color 3",
      type: "color",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "colorPicker4",
      title: "Color 4",
      type: "color",
      options: {
        disableAlpha: true,
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      color1: "colorPicker1",
      color2: "colorPicker2",
      color3: "colorPicker3",
      color4: "colorPicker4",
    },
    prepare(selection: any) {
      const { title, color1, color2, color3, color4 } = selection;
      return {
        title: title,
        // media: (
        //   <TWallpaper
        //     className="gradient-bg"
        //     options={{
        //       colors: [color1.hex, color2.hex, color3.hex, color4.hex],
        //       fps: 50,
        //     }}
        //   />
        // ),
      };
    },
  },
};
