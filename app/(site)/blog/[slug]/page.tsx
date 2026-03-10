import { SanityDocument } from "next-sanity";
import { Metadata } from "next";
import { BLOGS_QUERY, BLOG_QUERY } from "@/sanity/lib/queries";
import Blog from "@/components/Blogs/Blog";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const queryParams = await params;
  const initial = await sanityFetch({
    query: BLOG_QUERY,
    params: queryParams,
  });

  if (initial.data) {
    const metadata: Metadata = {
      title: initial.data.seoField?.title,
      description: initial.data.seoField?.description,
      alternates: {
        canonical:
          initial.data.seoField?.canonicalUrl ||
          `${process.env.NEXT_PUBLIC_URL}${initial.data.slug?.current}`,
      },
    };

    return metadata;
  }

  return {
    title: "Blog",
    description: "Blog post not found.",
    alternates: {
      canonical: process.env.NEXT_PUBLIC_URL || "",
    },
  };
};

export async function generateStaticParams() {
  const blogs = await client.fetch<SanityDocument[]>(BLOGS_QUERY);
  return blogs.map((blog) => ({
    slug: blog.pathname.current.split("/").pop(),
  }));
}

export default async function BlogsPage({ params }: PageProps) {
  const queryParams = await params;

  const initial = await sanityFetch({
    query: BLOG_QUERY,
    params: queryParams,
  });

  return <Blog blog={initial.data} />;
}
