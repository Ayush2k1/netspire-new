import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StylizeHeading } from "../../utils/stylizeHeading";
import Motionh2 from "../FramerMotion/Motionh2";
import MotionDiv from "../FramerMotion/MotionDiv";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { ModularPageSection } from "@/types";

const FeaturedLogos = (data: ModularPageSection<"block.featuredLogos">) => {
  return (
    <section className="section-padding" id="featuredLogos">
      <div className="max-w-container mx-auto flex flex-col gap-10">
        <div className="">
          {data?.heading && (
            <Motionh2
              delay={0.5}
              className="text-3xl 600:text-4xl text-center "
              content={StylizeHeading(data.heading)}
            />
          )}
        </div>
        <div className="flex flex-row flex-wrap items-center gap-10 justify-center">
          {data?.images?.length > 0 &&
            data.images.map(
              (img: any, key: any) =>
                img?.asset && (
                  <MotionDiv
                    key={`logo-slider-${key}`}
                    className="relative w-[200px]"
                    delay={key * 0.1 + 0.5}
                    content={
                      <AspectRatio ratio={1 / 1}>
                        <SanityImage
                          data={img}
                          className=" object-center object-contain"
                          alt={img.alt}
                        />
                      </AspectRatio>
                    }
                  />
                ),
            )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLogos;
