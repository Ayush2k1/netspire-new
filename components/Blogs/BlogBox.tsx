import Link from "next/link";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import formatDateOnlyDate from "@/utils/formatDateOnlyDate";
import { StylizeHeading } from "../../utils/stylizeHeading";
import { SanityImage } from "@/sanity/lib/sanity-image";

const BlogBox = ({ blog }: { blog: any }) => {
  return (
    <Link
      href={blog.pathname?.current || ""}
      className="rounded-lg overflow-hidden h-fit group"
    >
      <div className="relative flex flex-col gap-6 w-full bg-white ">
        <div className="relative overflow-hidden  w-full ">
          <AspectRatio ratio={14 / 10} className="rounded-lg overflow-hidden">
            <SanityImage
              data={blog.image}
              alt={blog.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-2 flex items-center gap-2">
            <ul className="z-2 flex flex-row gap-1">
              {blog.categories &&
                blog.categories.map((category: any, index: number) => (
                  <li
                    key={`blog-category-${index}`}
                    className="border border-black uppercase bg-white px-2 py-1 rounded-full text-[0.7rem] font-semibold"
                  >
                    {category.title}
                  </li>
                ))}
            </ul>
            <p className="text-sm font-semibold">
              {formatDateOnlyDate(blog._createdAt)}
            </p>
          </div>
          <div className="h-fit flex flex-col px-2 gap-2">
            <h3 className="text-2xl text-left  line-clamp-2">
              {StylizeHeading(blog.title as string)}
            </h3>
            <p className="text-lg text-gray-500 line-clamp-2">
              {blog.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogBox;
