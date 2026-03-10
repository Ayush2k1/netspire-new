import { Metadata } from "next";
import Contact from "@/components/Contact/Contact";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Contact Us | Isbister Coertze & Associates | Law Firm Prince Albert",
  description:
    "Get in touch with Isbister Coertze & Associates, a trusted law firm in Prince Albert. Contact us for expert legal advice and personalized assistance. We are here to help with all your legal needs.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/contact`,
  },
};

export default async function ContactPage() {
  const initial = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return <Contact settings={initial.data} />;
}
