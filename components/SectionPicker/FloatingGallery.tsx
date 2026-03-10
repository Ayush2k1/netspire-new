"use client";
import { StylizeHeading } from "@/utils/stylizeHeading";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MotionImage from "../FramerMotion/MotionImage";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { ModularPageSection } from "@/types";

const FloatingGallery = (
  props: ModularPageSection<"block.floatingGallery">,
) => {
  return (
    <section className="section-padding " id="floatingGallery">
      <div className="max-w-container mx-auto flex  items-start justify-center relative pt-[200px]">
        {props?.heading && (
          <div className=" mx-auto  absolute top-0  left-1/2 z-[2] -translate-x-1/2 w-full h-full">
            <div className="max-w-[450px] mx-auto sticky top-[200px]">
              <h2 className="text-4xl 450:text-5xl 600:text-6xl text-center w-full">
                {StylizeHeading(props.heading)}
              </h2>
            </div>
          </div>
        )}
        <div className="w-full relative z-[2] ">
          {/* <div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600 via-transparent to-transparent absolute w-full h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> */}
          {props?.images?.length > 0 &&
            props?.images.map((image: any, index: any) => {
              return (
                image?.asset && (
                  <div
                    key={`gallery-image-${index}`}
                    className="grid grid-cols-2 gap-2450:gap-10 550:gap-20 1000:gap-[250px] relative mx-auto"
                  >
                    {index % 2 === 0 && <div />}

                    <MotionImage
                      delay={0.5}
                      className=""
                      content={
                        <AspectRatio
                          ratio={3 / 4}
                          key={index}
                          className="w-full rounded-xl overflow-hidden "
                        >
                          <SanityImage
                            data={image}
                            alt={image.alt}
                            className="object-cover object-center"
                          />
                        </AspectRatio>
                      }
                    />
                  </div>
                )
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FloatingGallery;
