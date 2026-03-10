"use client";
import React from "react";
import Link from "next/link";
import MotionCard from "../FramerMotion/MotionCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import "@twallpaper/react/css";
import { SanityImage } from "@/sanity/lib/sanity-image";

const TeamCard = ({
  data,
  index,
  sticky = true,
}: {
  data: any & {
    position: string;
    gradient: {
      colorPicker1: { hex: string };
      colorPicker2: { hex: string };
      colorPicker3: { hex: string };
      colorPicker4: { hex: string };
    };
  };
  index: number;
  sticky?: boolean;
}) => {
  const isLarge = useMediaQuery("(min-width: 800px)");

  const indexTop: Record<number, string> = {
    0: "top-[100px]",
    1: "top-[205px]",
    2: "top-[310px]",
    3: "top-[415px]",
    4: "top-[520px]",
    5: "top-[625px]",
    6: "top-[730px]",
    7: "top-[835px]",
    8: "top-[940px]",
    9: "top-[1045px]",
    10: "top-[1150px]",
  };

  if (!sticky) {
    return (
      <Link
        href={data.pathname?.current || "#"}
        className="max-w-[700px] mx-auto w-full  h-[280px] animations rounded-2xl cursor-pointer bg-white"
      >
        <div
          className={cn(
            `z-[${(index + 1) * 10}]`,
            sticky && `sticky ${indexTop[index]}`,
            "bg-stone-100 hover:bg-stone-50 max-w-[700px] mx-auto w-full h-[280px] rounded-2xl p-6 flex flex-col  animations group",
          )}
        >
          <div className="top-3 right-3 absolute">
            <Button
              variant="ghost"
              className="p-1 rounded-full text-black bg-inherit group group-hover:bg-white"
            >
              <ArrowUpRight size={isLarge ? 40 : 30} />
            </Button>
          </div>
          <div className=" flex flex-col items-start justify-between h-full">
            <div className=" flex flex-row items-center gap-4">
              {data?.image?.asset && (
                <div className="w-[80px]">
                  <AspectRatio
                    ratio={1 / 1}
                    className=" rounded-full overflow-hidden  group-hover:grayscale-0 grayscale animations"
                  >
                    <SanityImage
                      data={data.image}
                      alt={
                        data?.image?.alt || "Boutique Law Firm in Prince Albert"
                      }
                      className="object-center object-cover "
                      sizes="(max-width: 700px) 50vw, 20vw"
                    />
                  </AspectRatio>
                </div>
              )}

              <div>
                {data?.firstName && data?.lastName && (
                  <h3 className="text-2xl font-bold overide-font-sans ">{`${data.firstName} ${data.lastName}`}</h3>
                )}
                {data?.position && <p>{data?.position}</p>}
              </div>
            </div>

            <div className="w-full">
              <Separator className="bg-black" />
              {data?.bio && <p className="mt-3  line-clamp-3">{data?.bio}</p>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <MotionCard
      index={index}
      style={{ zIndex: (index + 1) * 10 }}
      className={cn(
        `sticky ${indexTop[index]}`,
        "max-w-[700px] mx-auto w-full  h-[280px] animations rounded-2xl cursor-pointer bg-white",
      )}
      content={
        <Link href={data.pathname?.current || "#"}>
          <div
            className={cn(
              `z-[${(index + 1) * 10}]`,
              sticky && `sticky ${indexTop[index]}`,
              "bg-stone-100 hover:bg-stone-50 max-w-[700px] mx-auto w-full h-[280px] rounded-2xl p-6 flex flex-col  animations group",
            )}
          >
            <div className="top-3 right-3 absolute">
              <Button
                variant="ghost"
                className="p-1 rounded-full text-black bg-inherit group group-hover:bg-white"
              >
                <ArrowUpRight size={isLarge ? 40 : 30} />
              </Button>
            </div>
            <div className=" flex flex-col items-start justify-between h-full">
              <div className=" flex flex-row items-center gap-4">
                {data?.image?.asset && (
                  <div className="w-[80px]">
                    <AspectRatio
                      ratio={1 / 1}
                      className=" rounded-full overflow-hidden  group-hover:grayscale-0 grayscale animations"
                    >
                      <SanityImage
                        data={data.image}
                        alt={
                          data?.image?.alt ||
                          "Boutique Law Firm in Prince Albert"
                        }
                        className="object-center object-cover "
                        sizes="(max-width: 700px) 50vw, 20vw"
                      />
                    </AspectRatio>
                  </div>
                )}

                <div>
                  {data?.firstName && data?.lastName && (
                    <h3 className="text-2xl font-bold overide-font-sans ">{`${data.firstName} ${data.lastName}`}</h3>
                  )}
                  {data?.position && <p>{data?.position}</p>}
                </div>
              </div>

              <div className="w-full">
                <Separator className="bg-black" />
                {data?.bio && <p className="mt-3  line-clamp-3">{data?.bio}</p>}
              </div>
            </div>
          </div>
        </Link>
      }
    />
  );
};

export default TeamCard;
