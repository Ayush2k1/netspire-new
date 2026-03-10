import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { MEMBER_QUERY, TEAM_QUERY } from "@/sanity/lib/queries";
import Member from "@/components/Team/Member";
import { SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const queryParams = await params;

  const initial = await sanityFetch({
    query: MEMBER_QUERY,
    params: queryParams,
  });

  if (!initial.data) {
    return {
      title: "Team Member Not Found | Isbister Coertze & Associates",
      description:
        "The requested team member could not be found on the Isbister Coertze & Associates team page.",
    };
  }

  const { firstName, lastName, position } = initial.data;

  const fullName = `${firstName} ${lastName}`;
  const positionTitle = position?.position || "Legal Professional";

  const metadata: Metadata = {
    title: `${fullName} — ${positionTitle} | Isbister Coertze & Associates, Prince Albert`,
    description: `${fullName} is a valued ${positionTitle.toLowerCase()} at Isbister Coertze & Associates, a leading law firm in Prince Albert. Learn more about their expertise and role.`,
  };

  return metadata;
};

export async function generateStaticParams() {
  const team = await client.fetch<SanityDocument[]>(TEAM_QUERY);

  const params = team.map((member) => ({
    slug: member.pathname.current.split("/").pop(),
  }));

  return params;
}

export default async function Page({ params }: PageProps) {
  const queryParams = await params;

  const initial = await sanityFetch({
    query: MEMBER_QUERY,
    params: queryParams,
  });

  if (!initial.data) {
    notFound();
  }

  return <Member data={initial.data} />;
}
