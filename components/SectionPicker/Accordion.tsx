import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { StylizeHeading } from "../../utils/stylizeHeading";
import MotionAccordion from "../FramerMotion/MotionAccordion";
import MotionAccordions from "../FramerMotion/MotionAccordions";
import Motionh2 from "../FramerMotion/Motionh2";

export default function Accordions(data: any) {
  return (
    <section className="section-padding" id="accordions">
      <div className="max-w-[800px] w-full mx-auto flex flex-col gap-10">
        {data?.heading && (
          <Motionh2
            delay={0.5}
            className="text-3xl 600:text-4xl text-center  "
            content={StylizeHeading(data.heading)}
          />
        )}
        <Accordion type="single" collapsible className="w-full">
          <MotionAccordions
            className=""
            content={
              data?.accordions?.length > 0 &&
              data.accordions.map((accordion: any, key: any) => (
                <MotionAccordion
                  className=""
                  key={`accordion-${key}`}
                  delay={key * 0.1 + 0.5}
                  content={
                    <div key={key} className="mb-5">
                      <AccordionItem
                        key={`accordion-item-${key}`}
                        value={`accordion-${key}`}
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex flex-row items-center gap-4">
                            <div className="font-bold text-base text-gray-600 ">
                              {key < 9 ? "0" : ""}
                              {key + 1}
                            </div>
                            {accordion?.heading && (
                              <h3
                                style={{ fontFamily: "var(--font-dm-sans)" }}
                                className="text-lg 800:text-xl text-left"
                              >
                                {accordion.heading}
                              </h3>
                            )}
                          </div>
                        </AccordionTrigger>
                        {accordion?.content && (
                          <AccordionContent className="text-lg py-3 !text-gray-600">
                            {accordion.content}
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    </div>
                  }
                />
              ))
            }
          />
        </Accordion>
      </div>
    </section>
  );
}
