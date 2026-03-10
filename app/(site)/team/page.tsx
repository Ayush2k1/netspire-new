import { Metadata } from "next";
import Team from "@/components/Team/Team";
import { TEAM_PAGE_DATA, TEAM_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import PageHeader from "@/components/SectionPicker/PageHeader";

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  const teamPageData = await sanityFetch({
    query: TEAM_PAGE_DATA,
  });

  if (teamPageData.data) {
    const seoTitle = teamPageData.data.seoTitle;
    const seoDescription = teamPageData.data.seoDescription;
    const metadata: Metadata = {
      title: seoTitle,
      description: seoDescription,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/team`,
      },
    };

    return metadata;
  }
  return undefined;
};

export default async function TeamPage() {
  const teamPageData = await sanityFetch({
    query: TEAM_PAGE_DATA,
  });

  const teamMembers = await sanityFetch({
    query: TEAM_QUERY,
  });

  return (
    <>
      {teamPageData?.data?.title && teamPageData?.data.gradient && (
        // <PageHeader
        //   heading={teamPageData.data.title}
        //   gradient={
        //     teamPageData.data.gradient as {
        //       colorPicker1: { hex: string };
        //       colorPicker2: { hex: string };
        //       colorPicker3: { hex: string };
        //       colorPicker4: { hex: string };
        //     }
        //   }
        // />
        <></>
      )}
      {teamMembers && <Team team={teamMembers.data as unknown as any} />}
    </>
  );
}
