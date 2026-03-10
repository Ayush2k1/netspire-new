import React from "react";
import ServiceCard from "../Cards/ServiceCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StylizeHeading } from "../../utils/stylizeHeading";
import Motionh2 from "../FramerMotion/Motionh2";
import MotionP from "../FramerMotion/MotionP";
import MotionDiv from "../FramerMotion/MotionDiv";
import { ModularPageSection } from "@/types";

const Services = (data: ModularPageSection<"block.services">) => {
  return (
    <section className="section-padding" id="services">
      <div className="max-w-container mx-auto ">
        <div className="grid grid-cols-1 1150:grid-cols-5  h-full gap-10 1250:gap-14 ">
          <div className="1150:col-span-2  h-fit 1150:sticky 1150:top-[100px] ">
            <div className="flex flex-col gap-5">
              {data?.heading && (
                <Motionh2
                  delay={0.5}
                  className="text-3xl 600:text-4xl text-left"
                  content={StylizeHeading(data.heading)}
                />
              )}
              {data?.subHeading && (
                <MotionP
                  delay={0.6}
                  className="text-lg text-gray-600"
                  content={data.subHeading}
                />
              )}
              {data?.button?.url && (
                <MotionDiv
                  delay={0.7}
                  content={
                    <Link href={data.button.url}>
                      <Button size="lg">{data.button.title}</Button>
                    </Link>
                  }
                />
              )}
            </div>
          </div>
          <MotionDiv
            delay={0.8}
            className="1150:col-span-3 flex flex-col items-center 1300:items-end gap-28 mt-10 1300:mt-0 relative"
            content={
              data?.serviceCards?.length > 0 &&
              data.serviceCards.map((card: any, key: any) => (
                <ServiceCard
                  key={key}
                  card={
                    card as unknown as any & {
                      gradient: {
                        colorPicker1: { hex: string };
                        colorPicker2: { hex: string };
                        colorPicker3: { hex: string };
                        colorPicker4: { hex: string };
                      };
                    }
                  }
                  index={key}
                />
              ))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
