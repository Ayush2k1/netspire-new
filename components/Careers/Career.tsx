"use client";
import React from "react";
import { StylizeHeading } from "../../utils/stylizeHeading";
import TWallpaper from "@twallpaper/react";
import "@twallpaper/react/css";
import { PortableText } from "@portabletext/react";
import { RichTextBlockComponents } from "@/sanity/richText/RichTextBlock";
import formatDateOnlyDate from "@/utils/formatDateOnlyDate";

const Career = ({
  career,
}: {
  career: any & {
    gradient: {
      colorPicker1: { hex: string };
      colorPicker2: { hex: string };
      colorPicker3: { hex: string };
      colorPicker4: { hex: string };
    };
  };
}) => {
  return (
    <section className="1250:flex w-full ">
      <div className=" w-full h-[650px] 1250:w-[35%] 1250:h-screen 1250:sticky 1250:top-0 rounded-br-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full z-[1]">
          {career?.gradient && (
            <TWallpaper
              className="gradient-bg"
              options={{
                colors: [
                  career?.gradient?.colorPicker1?.hex,
                  career?.gradient?.colorPicker2?.hex,
                  career?.gradient?.colorPicker3?.hex,
                  career?.gradient?.colorPicker4?.hex,
                ],
                fps: 50,
              }}
            />
          )}
        </div>
        <div className="h-full w-full flex items-end section-padding 1350:px-auto 1250:px-5 px-auto relative z-[2]">
          <div className="flex flex-col gap-5">
            <div className="flex ">
              {career?.jobType && (
                <div className="bg-black text-white py-1 px-3 rounded-full mr-3">
                  {career.jobType}
                </div>
              )}
              {career?.jobLocation && (
                <div className="bg-white py-1 px-3 rounded-full mr-3">
                  {career.jobLocation}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {career?.jobTitle && (
                <h1 className="text-3xl 650:text-4xl font-semibold">
                  {StylizeHeading(career.jobTitle)}
                </h1>
              )}
              {career?.jobShortDescription && (
                <p className="text-lg">{career.jobShortDescription}</p>
              )}
            </div>

            {career?.applicationDeadline && (
              <p className="text-lg font-semibold">
                Application deadline:{" "}
                {formatDateOnlyDate(career.applicationDeadline)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="section-padding w-full 1250:w-[65%]">
        {career?.jobDescription && career?.jobDescription?.length > 0 && (
          <div className="max-w-small mx-auto">
            <PortableText
              value={career.jobDescription}
              components={RichTextBlockComponents}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Career;
