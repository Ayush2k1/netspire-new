"use client";
import { PortableText } from "@portabletext/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { RichTextBlockComponents } from "@/sanity/richText/RichTextBlock";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import formatDateOnlyDate from "@/utils/formatDateOnlyDate";
import { StylizeHeading } from "../../utils/stylizeHeading";
import { SanityImage } from "@/sanity/lib/sanity-image";

const BlogComp = ({ blog }: { blog: any }) => {
  return (
    <section>
      <div className="w-full section-padding py-[150px] ">
        <div className="w-full flex flex-col gap-10  max-w-small mx-auto">
          <div className="">
            <Link href="/blog" className="flex items-center">
              <span className="mr-2">
                <MoveLeft />
              </span>
              <span> Back to News & Resources</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {blog?.title && (
              <h1 className="text-4xl 1000:text-5xl text-left">
                {StylizeHeading(blog.title)}
              </h1>
            )}
            {blog?.description && (
              <p className="text-left text-lg 1000:text-xl text-gray-500">
                {blog.description}
              </p>
            )}
          </div>
          <div className="flex flex-col 450:flex-row 450:items-center 450:justify-between gap-4">
            <div className="flex flex-row gap-2 items-center">
              <div className="mr-4 w-[70px] rounded-full overflow-hidden">
                {blog?.author?.image && (
                  <AspectRatio ratio={1 / 1}>
                    <SanityImage
                      data={blog.author.image}
                      alt={blog.author.name}
                      className="object-cover object-center h-full w-full"
                      sizes="(max-width: 1000px) 25vw, 15vw"
                    />
                  </AspectRatio>
                )}
              </div>
              {blog?.author && (
                <div className="flex flex-col">
                  <p className="  text-gray-600 font-semibold">WORDS BY</p>
                  <h3 className="overide-font-sans text-lg">
                    {blog.author.name}
                  </h3>
                </div>
              )}
            </div>
            {blog?.publishedAt && (
              <div className="flex flex-row items-end gap-2">
                <p className="  text-gray-600 font-semibold">Published On</p>
                <p className="overide-font-sans text-lg">
                  {formatDateOnlyDate(blog.publishedAt)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative max-w-screen">
        {blog?.image?.asset && (
          <AspectRatio ratio={18 / 9}>
            <SanityImage
              data={blog.image}
              alt={blog.image.alt}
              className="object-cover object-center absolute inset-0 w-full h-full transition-transform duration-300"
            />
          </AspectRatio>
        )}
      </div>
      <div className="max-w-small mx-auto  section-padding pt-10 flex flex-col gap-4">
        <ul className=" flex flex-row gap-1 items-start justify-start">
          {blog?.categories &&
            blog.categories.map((category: any, index: number) => (
              <li
                key={`blog-category-${index}`}
                className="border border-black uppercase bg-white px-3 py-2 rounded-full text-[0.7rem] font-semibold"
              >
                {category.title}
              </li>
            ))}
        </ul>

        {blog?.body && blog?.body?.length > 0 && (
          <div className="col-span-12 1000:col-span-10">
            <PortableText
              value={blog.body}
              components={RichTextBlockComponents}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogComp;
