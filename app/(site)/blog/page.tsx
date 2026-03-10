import { Metadata } from "next";
import Blogs from "@/components/Blogs/Blogs";
import { BLOGS_QUERY, BLOG_PAGE_DATA } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import PageHeader from "@/components/SectionPicker/PageHeader";

export const generateMetadata = async (): Promise<Metadata> => {
  const blogPageData = await sanityFetch({
    query: BLOG_PAGE_DATA,
  });

  if (blogPageData.data) {
    const metadata: Metadata = {
      title: blogPageData.data.seoTitle,
      description: blogPageData.data.seoDescription,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/blog`,
      },
    };

    return metadata;
  }

  return {
    title: "Blog",
    description: "Read our latest blog posts.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/blog`,
    },
  };
};

export default async function BlogPage() {
  const blogPageData = await sanityFetch({
    query: BLOG_PAGE_DATA,
  });

  const initial = await sanityFetch({
    query: BLOGS_QUERY,
  });

  return (
    <>
      {/* <PageHeader
        heading={blogPageData?.data?.title as string}
        gradient={blogPageData?.data?.gradient}
      /> */}
      <Blogs blogs={initial.data} />
    </>
  );
}
