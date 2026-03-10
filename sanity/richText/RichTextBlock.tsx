import Link from "next/link";
import TeamRichText from "@/components/Team/TeamRichText";
import BlogRichText from "@/components/Blogs/BlogRichText";
import CareerRichText from "@/components/Careers/CareerRichText";
import { ReactNode } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { SanityImage } from "../lib/sanity-image";
import { ImArrowRight2 } from "react-icons/im";

function generateId(text: string) {
  const lowerCaseText = text.toString().toLowerCase();
  const hyphenatedText = lowerCaseText.replace(/\s+/g, "-");
  return hyphenatedText;
}

export const RichTextBlockComponents: any = {
  types: {
    imageBlock: ({ value }: { value: { image: { alt: string } } }) => (
      <div className="my-10 800:my-14">
        <AspectRatio
          ratio={16 / 9}
          className="w-full rounded-xl overflow-hidden"
        >
          <SanityImage
            data={value.image}
            alt={value?.image.alt}
            className="object-cover object-center pointer-events-none"
          />
        </AspectRatio>
      </div>
    ),

    callToAction: ({
      value,
      isInline,
    }: {
      value: { url: string; text: string };
      isInline: boolean;
    }) =>
      isInline ? (
        <Link href={value.url}>{value.text}</Link>
      ) : (
        <div className="">{value.text}</div>
      ),
    addTeam: ({ value, index }: { value: { team: any[] }; index: number }) => {
      return <TeamRichText data={value.team} index={index} />;
    },
    addCareer: ({ value }: { value: { careers: any[] } }) => (
      <CareerRichText data={value} />
    ),
    addBlogs: ({ value }: { value: { blogs: any[] } }) => (
      <BlogRichText data={value} />
    ),
  },

  marks: {
    link: ({
      children,
      value,
    }: {
      children: ReactNode;
      value: {
        href: string;
      };
    }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link className="underline font-bold" href={value?.href} rel={rel}>
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }: { children: ReactNode }) => (
      <ul className="flex flex-col gap-3 ">{children}</ul>
    ),
    number: ({ children }: { children: ReactNode }) => (
      <ol className="flex flex-col gap-3 ">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: { children: ReactNode }) => (
      <li className="flex flex-row items-center">
        <div className="listArrowIcon">
          <ImArrowRight2 />
        </div>
        <span className=""> {children}</span>
      </li>
    ),
    number: ({ children, index }: { children: ReactNode; index: number }) => (
      <li className="flex flex-row items-center">
        <div className="listNumberIcon ">{index + 1}</div>
        <span className="">{children}</span>
      </li>
    ),
  },

  block: {
    h1: (props: { children: ReactNode }) => (
      <h1
        className="leading-tight text-4xl font-medium capitalize mb-8 mt-5"
        id={generateId(props.children as string)}
      >
        {props.children}
      </h1>
    ),
    h2: (props: { children: ReactNode }) => {
      return (
        <h2
          className="leading-tight text-3xl font-medium capitalize mb-5 mt-7"
          id={generateId(props.children as string)}
        >
          {props.children}
        </h2>
      );
    },
    h3: (props: { children: ReactNode }) => (
      <h3
        className="leading-tight text-2xl font-medium capitalize mb-4 mt-6"
        id={generateId(props.children as string)}
      >
        {props.children}
      </h3>
    ),
    h4: (props: { children: ReactNode }) => (
      <h4
        className="leading-tight text-xl font-medium capitalize mb-3 mt-5"
        id={generateId(props.children as string)}
      >
        {props.children}
      </h4>
    ),
    blockquote: (props: { children: ReactNode }) => (
      <div className=" flex items-center gap-2 bg-stone-100 p-5 rounded-md text-base relative my-8">
        <div className="absolute top-2  left-2 rounded-full bg-white h-[85%]  w-[6px]" />
        <p className="ml-1">{props.children}</p>
      </div>
    ),

    normal: ({ children }: { children: ReactNode }) => {
      const isEmpty =
        !children ||
        (Array.isArray(children) &&
          children.every((child) => child === "\n" || child === ""));
      return isEmpty ? (
        <p className="my-5">&nbsp;</p>
      ) : (
        <p className="my-3">{children}</p>
      );
    },
  },
};
