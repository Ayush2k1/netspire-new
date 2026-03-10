"use client";
import { StylizeHeading } from "@/utils/stylizeHeading";
import TWallpaper from "@twallpaper/react";
import React from "react";
import "@twallpaper/react/css";
import MotionSlide from "../FramerMotion/MotionSlide";
import Motionh1 from "../FramerMotion/Motionh1";
import { ModularPageSection } from "@/types";

const PageHeader = ({
  heading,
  gradient,
}: ModularPageSection<"block.pageHeader">) => {
  return (
    <section
      className="section-padding h-[600px] flex items-center relative "
      id="pageHeader"
    >
      <div className="absolute top-0 left-0 w-full h-full z-[0]">
        {gradient && (
          <MotionSlide
            className="top-0 left-0 w-full h-full z-[-10] "
            content={
              <TWallpaper
                className="gradient-bg"
                options={{
                  colors: [
                    gradient?.colorPicker1?.hex,
                    gradient?.colorPicker2?.hex,
                    gradient?.colorPicker3?.hex,
                    gradient?.colorPicker4?.hex,
                  ],
                  fps: 50,
                  animate: false,
                }}
              />
            }
          />
        )}
      </div>
      <div className="max-w-container w-full mx-auto relative z-[10]">
        {heading && (
          <Motionh1
            className="text-4xl 750:text-5xl  text-center 1300:text-left "
            content={StylizeHeading(heading)}
          />
        )}
      </div>
    </section>
  );
};

export default PageHeader;
