import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { StylizeHeading } from "../../utils/stylizeHeading";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MotionImage from "../FramerMotion/MotionImage";
import Motionh3 from "../FramerMotion/Motionh3";
import MotionP from "../FramerMotion/MotionP";
import MotionDiv from "../FramerMotion/MotionDiv";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { ModularPageSection } from "@/types";

export default function TwoColumn(data: ModularPageSection<"block.twoColumn">) {
  return (
    data && (
      <section className="section-padding" id="twoColumn">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-2 gap-20 items-center justify-center">
            <div
              className={`w-full col-span-2 1200:col-span-1 ${
                data.inverted && "order-last ml-auto"
              }`}
            >
              <div className=" mx-auto w-full h-full rounded-lg overflow-hidden">
                {data?.image && (
                  <MotionImage
                    delay={0.5}
                    className=""
                    content={
                      <AspectRatio ratio={1.2 / 1}>
                        <SanityImage
                          className="object-cover object-center"
                          data={data.image}
                          sizes="(max-width: 1200px) 100vw, 50vw"
                          alt={data.image.alt}
                        />
                      </AspectRatio>
                    }
                  />
                )}
              </div>
            </div>
            <div className="col-span-2 1200:col-span-1 flex flex-col gap-6">
              {data?.heading && (
                <Motionh3
                  delay={0.6}
                  className="text-3xl text-left"
                  content={StylizeHeading(data.heading)}
                />
              )}
              {data?.text && (
                <MotionP
                  delay={0.7}
                  className="text-lg text-gray-600"
                  content={data.text}
                />
              )}

              <MotionDiv
                delay={0.8}
                className=""
                content={<Separator className="bg-gray-400" />}
              />

              {data?.button?.url && (
                <MotionDiv
                  delay={0.9}
                  className=""
                  content={
                    <Link href={data.button.url}>
                      <Button
                        variant="ghost"
                        className="ml-0 pl-0 font-semibold text-lg hover:bg-white hover:text-slate-500"
                      >
                        {data.button.title}
                        <ChevronRight size={16} />
                      </Button>
                    </Link>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </section>
    )
  );
}
