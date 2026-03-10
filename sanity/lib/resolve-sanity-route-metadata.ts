import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ResolvingMetadata } from "next";
import { imageBuilder } from "./client";
import config from "./config";

export function getOgImages(image: SanityImageSource) {
  const builder = imageBuilder.image(image).fit("max").auto("format");

  return [
    {
      url: builder.width(1200).url(),
      width: 1200,
    },
  ];
}

export async function resolveSanityRouteMetadata(
  {
    indexable,
    pathname,
    seoField,
  }: {
    indexable?: boolean;
    pathname?: any | null | string;
    seoField?: any;
  },
  parentPromise?: ResolvingMetadata,
) {
  if (!seoField) {
    return { title: config.siteName };
  }

  let path = "";

  if (pathname && typeof pathname !== "string" && pathname.current) {
    path = pathname?.current;
  } else if (pathname && typeof pathname === "string") {
    path = pathname;
  }

  const parent = await parentPromise;
  const title = seoField?.title || config.siteName;
  const canonicalUrl = seoField?.canonicalUrl;
  const ogImages = !seoField?.image
    ? parent?.openGraph?.images
    : getOgImages(seoField.image);

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description: seoField?.description || "",
    openGraph: {
      images: ogImages,
      title,
      url: canonicalUrl,
    },
    // robots: !indexable ? "noindex nofollow" : undefined,
    title,
  };
}
