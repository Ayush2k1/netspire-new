const baseUrlWithoutProtocol =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_BRANCH_URL;

const baseUrl = baseUrlWithoutProtocol
  ? `https://${baseUrlWithoutProtocol}`
  : "http://localhost:3000";

const config = {
  baseUrl,
  sanity: {
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-02",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    revalidateSecret: process.env.SANITY_REVALIDATE_SECRET || "",
    studioUrl: "/studio",
    token: process.env.SANITY_API_WRITE_TOKEN || "",
  },
  siteName: "Netspire",
};

export default config;
