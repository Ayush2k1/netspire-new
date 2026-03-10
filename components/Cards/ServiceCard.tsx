"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import TWallpaper from "@twallpaper/react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import MotionCard from "../FramerMotion/MotionCard";
import { SanityImage } from "@/sanity/lib/sanity-image";

const ServiceCard = ({ card, index }: { card: any; index: number }) => {
  const isLarge = useMediaQuery("(min-width: 800px)");
  const tWallpaperRef = useRef(null);

  const handleNextPosition = () => {
    if (tWallpaperRef.current) {
      tWallpaperRef.current.toNextPosition();
    }
  };

  const indexTop: Record<number, string> = {
    0: "top-[80px]",
    1: "top-[170px]",
    2: "top-[260px]",
    3: "top-[350px]",
    4: "top-[440px]",
    5: "top-[530px]",
    6: "top-[620px]",
    7: "top-[710x]",
    8: "top-[800px]",
    9: "top-[890px]",
    10: "top-[980px]",
  };

  return (
    card?.link && (
      <MotionCard
        index={index}
        style={{ zIndex: (index + 1) * 10 }}
        className={cn(
          `sticky ${indexTop[index]}`,

          "max-w-[700px] mx-auto w-full h-[280px] animations rounded-2xl cursor-pointer bg-white",
        )}
        content={
          <Link href={card.link} className="group">
            <div
              className="group px-4 flex flex-col justify-around h-full"
              onMouseEnter={() => handleNextPosition()}
              onMouseLeave={() => handleNextPosition()}
            >
              {card?.gradient && (
                <div className="absolute top-0 left-0 w-full z-[-2] h-full rounded-xl">
                  <TWallpaper
                    ref={tWallpaperRef}
                    className="gradient-bg rounded-xl overflow-hidden"
                    options={{
                      colors: [
                        card.gradient?.colorPicker1?.hex,
                        card.gradient?.colorPicker2?.hex,
                        card.gradient?.colorPicker3?.hex,
                        card.gradient?.colorPicker4?.hex,
                      ],
                      fps: 50,
                      animate: false,
                    }}
                  />
                </div>
              )}
              <div className=" flex flex-col justify-around h-full ">
                <div className="flex items-center 800:items-start justify-between ">
                  <div className="w-[130px]">
                    {card?.icon && (
                      <AspectRatio
                        ratio={5 / 2}
                        className=" rounded-lg overflow-hidden "
                      >
                        <SanityImage
                          data={card.icon}
                          alt={card.icon.alt}
                          className="object-left object-contain"
                          sizes="(max-width: 700px) 40vw, 20vw"
                        />
                      </AspectRatio>
                    )}
                  </div>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-1  rounded-full text-black bg-inherit group group-hover:bg-white"
                    >
                      <ArrowUpRight size={isLarge ? 40 : 30} />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-2xl 500:text-3xl font-semibold"
                  >
                    {card.heading}
                  </h3>
                </div>
                <div>
                  <Separator className="bg-black" />
                  <p className="mt-3 line-clamp-2">{card.subHeading}</p>
                </div>
              </div>
            </div>
          </Link>
        }
      />
    )
  );
};

export default ServiceCard;
