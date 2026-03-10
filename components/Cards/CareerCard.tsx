"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { StylizeHeading } from "@/utils/stylizeHeading";
import { Badge } from "@/components/ui/badge";
import formatDateOnlyDate from "@/utils/formatDateOnlyDate";

const CareerCard = ({ data, index }: { data: any; index: number }) => {
  return (
    <Link key={index} href={data.pathname?.current || ""} className="group">
      <div
        className={cn(
          "bg-stone-100 hover:bg-stone-50  max-w-[700px] mx-auto w-full h-[300px] rounded-2xl p-6 flex flex-col  relative  animations ",
        )}
      >
        <div className="top-3 right-3 absolute">
          <Button
            variant="ghost"
            className="p-1 rounded-full text-black bg-inherit group group-hover:bg-white"
          >
            <ArrowUpRight size={35} />
          </Button>
        </div>
        <div className=" flex flex-col items-start justify-between h-full">
          <div className="flex flex-row gap-2 ">
            <Badge className="text-base ">{data.jobType}</Badge>{" "}
            <Badge className="bg-white text-base text-black">
              {data.jobLocation}
            </Badge>
          </div>

          <h3 className="text-2xl ">
            {StylizeHeading(data.jobTitle as string)}
          </h3>
          <div className="w-full flex flex-col gap-3">
            <Separator className="bg-black/10" />
            <p className="  line-clamp-3">{data.jobShortDescription}</p>

            {data?.applicationDeadline && (
              <p className="text-base ">
                Application deadline:{" "}
                {formatDateOnlyDate(data.applicationDeadline)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CareerCard;
