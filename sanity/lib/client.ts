import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const imageBuilder = createImageUrlBuilder({
  dataset,
  projectId,
});
