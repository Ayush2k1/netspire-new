"use client";
import React from "react";
import { StylizeHeading } from "../../utils/stylizeHeading";
import TWallpaper from "@twallpaper/react";
import "@twallpaper/react/css";
import { PortableText } from "@portabletext/react";
import { RichTextBlockComponents } from "@/sanity/richText/RichTextBlock";
import { FaPaperPlane } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";
import formatPhoneNumber from "@/utils/formatPhone";
import { SanityImage } from "@/sanity/lib/sanity-image";
import { TypedObject } from "sanity";

const TeamMember = ({
  member,
}: {
  member: any & {
    shortBio: string;
    position: string;
    gradient: {
      colorPicker1: { hex: string };
      colorPicker2: { hex: string };
      colorPicker3: { hex: string };
      colorPicker4: { hex: string };
    };
  };
}) => {
  return (
    <section>
      <div className="relative w-full h-[30vh] 1000:h-[45vh]">
        <div className="absolute top-0 left-0 w-full h-full">
          <TWallpaper
            className="gradient-bg h-full w-full"
            options={{
              colors: [
                member.gradient.colorPicker1.hex,
                member.gradient.colorPicker2.hex,
                member.gradient.colorPicker3.hex,
                member.gradient.colorPicker4.hex,
              ],
              fps: 400,
            }}
          />
        </div>
      </div>
      <div className="section-padding pt-0 relative">
        <div className=" max-w-container mx-auto">
          <div className="flex items-center">
            <div className="absolute top-[-70px] 1000:top-[-90px]">
              <SanityImage
                data={member.image}
                className="w-[120px] h-[120px] 1000:w-[170px] 1000:h-[170px] rounded-full object-cover object-center"
                alt={member.firstName}
                sizes="20vw"
              />
            </div>
            <div className="grid 1000:grid-cols-2 w-full">
              <div className="pt-14 1000:pt-20">
                <h1 className="text-left text-5xl mb-3">
                  {member.firstName}
                  {StylizeHeading(` ${member.lastName}`)}
                </h1>
                <p className="bg-slate-300 w-fit rounded-full py-1 px-3 text-lg">
                  {member.position}
                </p>
                <div className="mt-10 flex flex-col space-y-3">
                  {member.email && (
                    <div className="flex items-center">
                      <span className="bg-black text-white rounded-full p-2 mr-2">
                        <FaPaperPlane />
                      </span>
                      <p className="font-semibold">
                        <Link href={`mailto:${member.email}`}>
                          {member.email}
                        </Link>
                      </p>
                    </div>
                  )}

                  {member.phone && (
                    <div className="flex items-center">
                      <span className="bg-black text-white rounded-full p-2 mr-2">
                        <FaPhone />
                      </span>
                      <p className="font-semibold">
                        <Link href={`tel:${member.phone}`}>
                          {formatPhoneNumber(member.phone.toString())}
                        </Link>
                      </p>
                    </div>
                  )}
                  {member.linkdin && (
                    <div className="flex items-center">
                      <span className="bg-black text-white rounded-full p-2 mr-2">
                        <FaLinkedinIn />
                      </span>
                      <p className="font-semibold">
                        <Link href={member.linkdin}>LinkedIn profile</Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-10 h-fit">
                <div className="h-full">
                  <h2 className="text-3xl font-semibold mb-5">
                    {StylizeHeading("Rich Text Content (Bio)")}
                  </h2>
                  <div>
                    <PortableText
                      value={member.bio as unknown as TypedObject}
                      components={RichTextBlockComponents}
                    />
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-5">
                    {StylizeHeading("Rich Text Content ( Short Bio)")}
                  </h2>
                  <div>
                    <p className="paragraph">{member.shortBio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
