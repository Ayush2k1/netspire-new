"use client";
import Motionh3 from "../FramerMotion/Motionh3";
import { StylizeHeading } from "@/utils/stylizeHeading";
import MotionP from "../FramerMotion/MotionP";
import MotionDiv from "../FramerMotion/MotionDiv";
import { usePathname } from "next/navigation";

const Newsletter = () => {
  const pathname = usePathname();
  const nonIncludePaths = ["/contact"];

  return (
    !nonIncludePaths.includes(pathname) && (
      <section className="section-padding">
        <div className="max-w-container mx-auto">
          <div className="1000:grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <Motionh3
                delay={0.5}
                className=" text-3xl 600:text-4xl text-center 600:text-left "
                content={StylizeHeading("Sign up to our newsletter")}
              />

              <MotionP
                delay={0.6}
                className="text-lg text-gray-600 text-center 600:text-left"
                content={
                  "Stay Updated with Our Law Firm's Latest News and Insights!"
                }
              />
            </div>

            {/* <MotionDiv
              delay={0.7}
              className="flex flex-col pt-6 1000:pt-0 1000:p-6 "
              content={<FormNewsLetter />}
            /> */}
          </div>
        </div>
      </section>
    )
  );
};

export default Newsletter;
