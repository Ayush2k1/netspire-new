import { loadPageByPathname } from "@/sanity/lib";
import { resolveSanityRouteMetadata } from "@/sanity/lib/resolve-sanity-route-metadata";
import SectionsRenderer from "@/components/SectionRenderer";
import type { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PATHNAMES_QUERY } from "@/sanity/lib/queries";
import GradientHero from "@/components/SectionPicker/ayush/GradientHero";
import StickyCards from "@/components/SectionPicker/ayush/StickyCards";
import Hemingway from "@/components/SectionPicker/ayush/Hemmingway";
import StaticHousePage from "@/components/SectionPicker/ayush/BlockText";

export type DynamicRouteProps = { params: Promise<{ path: string[] }> };

export async function generateMetadata(
  props: DynamicRouteProps,
  parent: ResolvingMetadata,
) {
  const params = await props.params;
  const initialData = await loadPageByPathname({ params });

  if (!initialData) {
    return notFound();
  }

  if (initialData._type === "page") {
    return resolveSanityRouteMetadata(initialData, parent);
  }
  return {};
}

export async function generateStaticParams() {
  const { data: allPathnames } = await sanityFetch({
    query: ALL_PATHNAMES_QUERY,
    stega: false,
    perspective: "published",
  });

  const params = allPathnames
    .filter(
      ({ pathname }: { pathname: string | null }) =>
        pathname && pathname !== "/",
    )
    .map(({ pathname }: { pathname: string | null }) => {
      if (!pathname) return { path: [] };
      const path = pathname.split("/").filter(Boolean);
      return { path };
    });

  return params;
}

export default async function DynamicRoute(props: DynamicRouteProps) {
  const params = await props.params;

  const initialData = await loadPageByPathname({ params });

  if (!initialData) return notFound();

  switch (initialData._type) {
    case "page":
      return (
        <Suspense>
          <div className="overflow-x-hidden">
            <GradientHero />
            <StickyCards />
            <Hemingway />
            <StaticHousePage />
          </div>
          <SectionsRenderer
            {...{
              fieldName: "body",
              sections: initialData.sectionPicker || [],
            }}
          />
        </Suspense>
      );
    default:
      return <div>Template not found</div>;
  }
}
