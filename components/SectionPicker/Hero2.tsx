import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { StylizeHeading } from "../../utils/stylizeHeading";
import { TWallpaper } from "@twallpaper/react";
import "@twallpaper/react/css";
import Motionh1 from "../FramerMotion/Motionh1";
import MotionP from "../FramerMotion/MotionP";
import MotionDiv from "../FramerMotion/MotionDiv";
import MotionSlide from "../FramerMotion/MotionSlide";
import { ModularPageSection } from "@/types";

const Hero2 = (data: ModularPageSection<"block.hero2">) => {
  return (
    <section className="h-screen" id="hero2">
      <div className="relative !h-[50vh]  w-full overflow-hidden">
        {data?.gradient && (
          <MotionSlide
            className="top-0 left-0 w-full h-full z-[-10] "
            content={
              <TWallpaper
                className="gradient-bg"
                options={{
                  colors: [
                    data.gradient.colorPicker1?.hex,
                    data.gradient.colorPicker2?.hex,
                    data.gradient.colorPicker3?.hex,
                    data.gradient.colorPicker4?.hex,
                  ],
                  fps: 50,
                  // pattern: {
                  //   blur: 3,
                  //   size: "100",
                  //   background: "#000",
                  //   image:
                  //     "https://cdn.sanity.io/images/xz3v5vl6/production/06cbd8baf0d9760b7333ca7d9b59efe078b6bbe6-700x700.svg",
                  // },
                }}
              />
            }
          />
        )}
      </div>
      <div className="section-padding py-10 h-[50vh] bg-white ">
        <div className="max-w-container mx-auto flex items-center justify-center h-full">
          <div className="flex flex-col w-full 1100:flex-row 1100:justify-between 1100:items-end gap-5">
            <div className="1000:max-w-[600px] flex flex-col gap-2 1200:gap-5">
              {data?.heading && (
                <Motionh1
                  className=" text-4xl 1000:text-5xl 1450:text-6xl text-left "
                  content={StylizeHeading(data.heading)}
                />
              )}
              {data?.subHeading && (
                <MotionP
                  className="text-lg 1200:w-2/3 text-gray-600 "
                  delay={0.2}
                  content={data.subHeading}
                />
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              {data?.primaryCta?.url && (
                <MotionDiv
                  className=""
                  delay={0.3}
                  content={
                    <Link href={data.primaryCta.url}>
                      <Button size="lg">{data.primaryCta.title}</Button>
                    </Link>
                  }
                />
              )}
              {data?.secondaryCta?.url && (
                <MotionDiv
                  className=""
                  delay={0.4}
                  content={
                    <Link href={data.secondaryCta.url}>
                      <Button size="lg" variant="secondary">
                        {data.secondaryCta.title}
                      </Button>
                    </Link>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
