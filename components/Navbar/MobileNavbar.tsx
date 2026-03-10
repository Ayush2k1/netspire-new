"use client";
import React from "react";
import Link from "next/link";
import { useNavToggle } from "@/app/contexts/GlobalContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MotionNavItems from "../FramerMotion/MotionNavItems";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import Motionh2 from "../FramerMotion/Motionh2";
import useScrollBehavior from "../ui/use-scroll-behaviour";

const MobileAccountNav = ({ settingsData }: { settingsData: any }) => {
  const { isOpen, toggleNav } = useNavToggle();

  useScrollBehavior(isOpen);
  return (
    <Drawer open={isOpen} onOpenChange={toggleNav} direction="right">
      {isOpen && <RemoveScrollBar />}
      <DrawerContent className="z-[1000] outline-0 focus:ring-0 ring-0 select-none h-screen max-w-[750px] bg-transparent border-0 ml-auto px-3 500:px-10 ">
        <div className="my-auto flex flex-col h-full 500:h-[95vh] 650:h-[90vh] bg-white rounded-xl overflow-hidden">
          <div className="bg-slate-100 text-xl w-full p-7 ">
            <Motionh2
              className=" overide-font-sans text-xl font-semibold"
              content={"Menu"}
            />
          </div>
          <div className="bg-white p-7">
            <div className="flex flex-col text-xl items-start gap-5 ">
              <Accordion type="single" collapsible className="w-full">
                {settingsData?.menu?.links &&
                settingsData.menu.links?.length > 0 ? (
                  settingsData.menu.links.map((link: any, index: any) => (
                    <MotionNavItems
                      delay={index * 0.1 + 0.3}
                      className="w-full "
                      key={`settings-data-${index}`}
                      content={
                        link._type === "multipleLinks" ? (
                          <AccordionItem value={link.title as string}>
                            <AccordionTrigger>
                              <h3 className=" overide-font-sans py-1">
                                {link.title}
                              </h3>
                            </AccordionTrigger>
                            <AccordionContent className="pl-3">
                              {link.links && link.links?.length > 0 ? (
                                link.links.map((li: any, index: any) => (
                                  <div
                                    key={`link-settings-${index}`}
                                    className="mb-3 text-gray-500"
                                  >
                                    <Link
                                      href={li.url}
                                      className="text-lg mb-4"
                                      onClick={() => toggleNav(!isOpen)}
                                    >
                                      {li.title}
                                    </Link>
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-red-500">
                                  No Links found
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            key={`hovered-link-${index}`}
                            onClick={() => toggleNav(!isOpen)}
                            href={`${link.url}`}
                          >
                            <h3 className=" overide-font-sans py-5 border-b w-full">
                              {link.title}
                            </h3>
                          </Link>
                        )
                      }
                    />
                  ))
                ) : (
                  <div className="p-4 text-red-500">Not found</div>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileAccountNav;
