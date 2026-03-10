import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StylizeHeading } from "../../utils/stylizeHeading";
import Motionh2 from "../FramerMotion/Motionh2";
import MotionP from "../FramerMotion/MotionP";
import MotionDiv from "../FramerMotion/MotionDiv";
import MotionImage from "../FramerMotion/MotionImage";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { ModularPageSection } from "@/types";

const CallToAction = (data: ModularPageSection<"block.callToAction">) => {
  return (
    <section className="section-padding py-8 1150:py-auto " id="callToAction">
      <div className="max-w-container mx-auto relative ">
        <div className="grid 1100:grid-cols-2 gap-12  items-center justify-center rounded-b-xl p-10 bg-gradient-to-t from-stone-100 to-transparent ">
          <div className="flex flex-col gap-6 relative 1200:w-full bottom-[-50px] 1200:bottom-[-80px] 1100:max-w-auto 700:max-w-[90%] mx-auto">
            {data?.heading && (
              <Motionh2
                delay={0.5}
                className="text-3xl 600:text-4xl  text-left  "
                content={StylizeHeading(data.heading)}
              />
            )}
            {data?.body && (
              <MotionP
                delay={0.6}
                className="text-lg text-gray-600"
                content={data.body}
              />
            )}
            <div className="flex flex-row flex-wrap  gap-2">
              {data?.primaryCta?.url && (
                <MotionDiv
                  className=""
                  delay={0.7}
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
                  delay={0.8}
                  content={
                    <Link href={data.secondaryCta.url}>
                      <Button size="lg" variant="link">
                        {data.secondaryCta.title}
                      </Button>
                    </Link>
                  }
                />
              )}
            </div>
          </div>

          <MotionImage
            className="relative 1200:w-full bottom-[-50px] 1200:bottom-[-80px] "
            delay={0.5}
            content={
              data?.image?.asset && (
                <AspectRatio
                  ratio={3 / 4}
                  className="flex justify-center w-full rounded-lg overflow-hidden 1100:max-w-none 700:max-w-[90%] mx-auto"
                >
                  <SanityImage
                    className="object-cover object-center "
                    sizes="(max-width: 1200px) 100vw, 50vw"
                    data={data.image}
                    alt={data.image.alt}
                  />
                </AspectRatio>
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
