"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { StylizeHeading } from "../../utils/stylizeHeading";
import Motionh2 from "../FramerMotion/Motionh2";
import MotionDiv from "../FramerMotion/MotionDiv";
import MotionAccordion from "../FramerMotion/MotionAccordion";
import MotionImage from "../FramerMotion/MotionImage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { ModularPageSection } from "@/types";

const variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
};

export default function ImageAccordion(
  data: ModularPageSection<"block.imageAccordion">,
) {
  const [image, setImage] = useState(data.imageAccordion[0].image);
  return (
    <section className="section-padding" id="imageAccordion">
      <div className="max-w-container  mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-6">
          {data?.heading && (
            <Motionh2
              delay={0.5}
              className="text-3xl 600:text-4xl text-center 1000:max-w-[600px] mx-auto"
              content={StylizeHeading(data.heading)}
            />
          )}
          {data?.button?.url && (
            <MotionDiv
              delay={0.6}
              className="w-full flex justify-center"
              content={
                <Link href={data.button.url}>
                  <Button size="lg">{data.button.title}</Button>
                </Link>
              }
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-14">
          <MotionImage
            className="col-span-2 1200:col-span-1 "
            content={
              image?.asset && (
                <motion.div
                  key={image.asset._ref}
                  variants={variants}
                  initial={"hidden"}
                  animate={"visible"}
                  exit={"hidden"}
                  transition={{
                    duration: 1,
                    delay: 0,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className=" mx-auto w-full h-full"
                >
                  <AspectRatio
                    ratio={1.2 / 1}
                    className=" rounded-xl overflow-hidden"
                  >
                    <SanityImage
                      className="object-cover object-center "
                      data={image}
                      alt={image.alt}
                      sizes="(max-width: 1200px) 100vw, 50vw"
                    />
                  </AspectRatio>
                </motion.div>
              )
            }
          />

          <div className="col-span-2 1200:col-span-1 order-first 1200:order-last">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="accordion-0"
            >
              {data?.imageAccordion?.length > 0 &&
                data.imageAccordion.map((accordion: any, key: any) => (
                  <MotionAccordion
                    className="py-2"
                    key={`accordion-${key}`}
                    delay={key * 0.1 + 0.5}
                    content={
                      <AccordionItem
                        onClick={() => {
                          setImage(accordion.image);
                        }}
                        key={`accordion-item-${key}`}
                        value={`accordion-${key}`}
                      >
                        <AccordionTrigger className="hover:no-underline cursor-pointer">
                          {accordion?.heading && (
                            <div>
                              <p className="text-lg 1200:text-xl font-semibold">
                                {accordion.heading}
                              </p>
                            </div>
                          )}
                        </AccordionTrigger>
                        {accordion?.content && (
                          <AccordionContent className="text-lg text-gray-600">
                            {accordion.content}
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    }
                  />
                ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
