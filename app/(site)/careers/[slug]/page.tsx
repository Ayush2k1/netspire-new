import { SanityDocument } from "next-sanity";
import { CAREERS_QUERY, CAREER_QUERY } from "@/sanity/lib/queries";
import Career from "@/components/Careers/Career";
import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const queryParams = await params;

  const initial = await sanityFetch({
    query: CAREER_QUERY,
    params: queryParams,
  });

  const metadata: Metadata = {
    title: `${initial.data?.seoField?.title} | Careers at Isbister Coertze & Associates | Law Firm Prince Albert`,
    description: `Careers at Isbister Coertze & Associates  - ${initial.data?.seoField?.description}`,
    alternates: {
      canonical:
        initial.data?.seoField?.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_URL}${initial.data?.pathname?.current}`,
    },
  };
  return metadata;
};

export async function generateStaticParams() {
  const careers = await client.fetch<SanityDocument[]>(CAREERS_QUERY);
  return careers.map((career) => ({
    slug: career.pathname.current.split("/").pop(),
  }));
}

export default async function CareersPage({ params }: PageProps) {
  const queryParams = await params;

  const initial = await sanityFetch({
    query: CAREER_QUERY,
    params: queryParams,
  });

  if (!initial.data) {
    notFound();
  }

  return (
    <Career
      career={
        initial.data as unknown & {
          gradient: {
            colorPicker1: { hex: string };
            colorPicker2: { hex: string };
            colorPicker3: { hex: string };
            colorPicker4: { hex: string };
          };
        }
      }
    />
  );
}
