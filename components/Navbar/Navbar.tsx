"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAnimationToggle, useNavToggle } from "@/app/contexts/GlobalContext";
import { ChevronRight } from "lucide-react";
import useScrollPosition from "@/utils/useScrollPosition";
import { motion } from "framer-motion";
import { Cross as Hamburger } from "hamburger-react";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -200,
  },
};

function Navbar({ settingsData }: { settingsData: any }) {
  const { isOpen, toggleNav } = useNavToggle();
  const [active, setActive] = useState<string | null>(null);

  const { isAnimation, toggleAnimation } = useAnimationToggle();

  const { scrollPosition, scrollHeight } = useScrollPosition();

  return (
    !isAnimation && (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{
          duration: 0.5,
          delay: 0,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className={cn(
          // scrollPosition > 50 && "bg-white",
          "fixed inset-x-0 rounded-none mx-auto  z-100 px-5 1500:px-20 animations py-2",
        )}
      >
        <div className="flex justify-between items-center">
          <div className="relative w-62.5 1250:w-71.25 cursor-pointer ">
            <Link href="/">
              <SanityImage
                className="max-w-[70%]"
                data={settingsData?.logoDark}
                alt={settingsData?.logoDark?.alt}
              />
            </Link>
          </div>

          <div className="hidden 1200:flex items-center relative">
            <Menu setActive={setActive}>
              {settingsData?.menu?.links &&
              settingsData.menu.links?.length > 0 ? (
                settingsData.menu.links.map((link: any, index: any) =>
                  link._type === "multipleLinks" ? (
                    <MenuItem
                      setActive={setActive}
                      active={active}
                      item={link.title as string}
                      key={`menu-${index}`}
                    >
                      <div className="flex flex-col space-y-4">
                        {link.links && link.links?.length > 0 ? (
                          link.links.map((li: any, index: any) => (
                            <HoveredLink
                              key={`menu-item-${index}`}
                              href={`${li.url}`}
                            >
                              <div>{li.title}</div>
                            </HoveredLink>
                          ))
                        ) : (
                          <div className="p-4 text-red-500">No Links found</div>
                        )}
                      </div>
                    </MenuItem>
                  ) : (
                    <HoveredLink
                      key={`hovered-link-${index}`}
                      href={`${link.url}`}
                    >
                      {link.title}
                    </HoveredLink>
                  ),
                )
              ) : (
                <div className="p-4 text-red-500">No services found</div>
              )}
            </Menu>

            <Link href="/contact">
              <Button>
                Book A Consultation <ChevronRight size={18} strokeWidth={3} />
              </Button>
            </Link>
          </div>
          <div className="1200:hidden block">
            <Hamburger toggled={isOpen} toggle={() => toggleNav(!isOpen)} />
          </div>
        </div>
      </motion.div>
    )
  );
}

export default Navbar;
