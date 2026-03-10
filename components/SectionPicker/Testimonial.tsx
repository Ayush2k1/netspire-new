"use client";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { StylizeHeading } from "../../utils/stylizeHeading";
import { cn } from "@/lib/utils";
import Motionh3 from "../FramerMotion/Motionh3";
import MotionDiv from "../FramerMotion/MotionDiv";
import { ModularPageSection } from "@/types";

const Testimonial = (data: ModularPageSection<"block.testimonials">) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="section-padding" id="testimonial">
      <div className="max-w-container mx-auto relative">
        <div className="mb-6">
          {data?.heading && (
            <Motionh3
              delay={0.5}
              className="text-3xl text-center"
              content={StylizeHeading(data.heading)}
            />
          )}
        </div>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            startIndex: 0,
          }}
        >
          <MotionDiv
            delay={0.6}
            content={
              <CarouselContent className="py-8">
                {data?.testimonials?.length > 0 &&
                  data.testimonials.map((testimonial: any, index: any) => (
                    <CarouselItem key={`coloumn-grid-item-${index}`}>
                      {testimonial?.testimonial && (
                        <p className="1000:max-w-[50%] 1200:max-w-[70%] mx-auto text-xl 1200:text-2xl text-center">
                          {testimonial.testimonial}
                        </p>
                      )}
                    </CarouselItem>
                  ))}
              </CarouselContent>
            }
          />

          <MotionDiv
            delay={0.7}
            className="relative w-fit mx-auto mt-10 flex items-center space-x-3 h-[15px]"
            content={
              data?.testimonials?.length > 0 &&
              Array.from({ length: data.testimonials.length }, (_, i) => (
                <div
                  key={`additional-div-${i}`}
                  onClick={() => {
                    api?.scrollTo(i);
                  }}
                  className={cn(
                    current - 1 === i
                      ? "opacity-100 h-5 w-5"
                      : "opacity-50 h-4 w-4",
                    "additional-div rounded-full border  flex items-center justify-center bg-black animations cursor-pointer",
                  )}
                ></div>
              ))
            }
          />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
