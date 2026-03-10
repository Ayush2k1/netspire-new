import { Button } from "../../components/ui/button";
import Link from "next/link";
import { StylizeHeading } from "../../utils/stylizeHeading";
import TWallpaper from "@twallpaper/react";
import Motionh1 from "../FramerMotion/Motionh1";
import MotionP from "../FramerMotion/MotionP";
import MotionDiv from "../FramerMotion/MotionDiv";
import MotionSlide from "../FramerMotion/MotionSlide";
import { ModularPageSection } from "@/types";

const Hero = (data: ModularPageSection<"block.hero">) => {
  return (
    <section
      id="hero"
      className="section-padding relative h-screen overflow-hidden flex items-center justify-start"
    >
      <MotionSlide
        className="absolute top-0 left-0 w-full h-full z-0"
        content={
          data?.gradient && (
            <TWallpaper
              className="gradient-bg"
              options={{
                colors: [
                  data?.gradient?.colorPicker1?.hex,
                  data?.gradient?.colorPicker2?.hex,
                  data?.gradient?.colorPicker3?.hex,
                  data?.gradient?.colorPicker4?.hex,
                ],
                fps: 50,
              }}
            />
          )
        }
      />
      <div className="max-w-container mx-auto flex flex-col gap-4 1200:gap-8 justify-center h-full relative z-10 w-full">
        <div className="1000:max-w-150 flex flex-col gap-2 1200:gap-4">
          {data?.heading && (
            <Motionh1
              className="text-4xl 1000:text-5xl 1350:text-6xl  text-left "
              content={StylizeHeading(data.heading)}
            />
          )}
          {data?.subHeading && (
            <MotionP
              delay={0.2}
              className="text-lg  "
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
                <Link
                  href={data.primaryCta.url}
                  target={data?.primaryCta?.newWindow ? "_blank" : "_self"}
                >
                  <Button
                    size="lg"
                    className="rounded-full p-6 mb-3 1200:mb-5 500:mb-0 w-fit"
                  >
                    {data.primaryCta.title}
                  </Button>
                </Link>
              }
            />
          )}
          {data?.secondaryCta?.url && (
            <MotionDiv
              className=""
              delay={0.4}
              content={
                <Link
                  href={data.secondaryCta.url}
                  target={data?.secondaryCta?.newWindow ? "_blank" : "_self"}
                >
                  <Button
                    size="lg"
                    className="rounded-full p-6 w-fit"
                    variant="secondary"
                  >
                    {data.secondaryCta.title}
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
