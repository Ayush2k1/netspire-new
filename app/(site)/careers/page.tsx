import { Metadata } from "next";
import Careers from "@/components/Careers/Careers";
import { CAREERS_QUERY, CAREER_PAGE_DATA } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import PageHeader from "@/components/SectionPicker/PageHeader";

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  const careersPageData = await sanityFetch({
    query: CAREER_PAGE_DATA,
  });

  if (careersPageData.data) {
    const seoTitle = careersPageData.data.seoTitle;
    const seoDescription = careersPageData.data.seoDescription;
    const metadata: Metadata = {
      title: seoTitle,
      description: seoDescription,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/careers`,
      },
    };

    return metadata;
  }
  return undefined;
};

export default async function CareerPage() {
  const careersPageData = await sanityFetch({
    query: CAREER_PAGE_DATA,
  });

  const initial = await sanityFetch({
    query: CAREERS_QUERY,
  });

  return (
    <>
      {careersPageData?.data?.title && careersPageData?.data.gradient && (
        // <PageHeader
        //   heading={careersPageData.data.title}
        //   gradient={
        //     careersPageData.data.gradient as {
        //       colorPicker1: { hex: string };
        //       colorPicker2: { hex: string };
        //       colorPicker3: { hex: string };
        //       colorPicker4: { hex: string };
        //     }
        //   }
        // />
        <></>
      )}
      {initial && <Careers careers={initial.data} />}
    </>
  );
}
