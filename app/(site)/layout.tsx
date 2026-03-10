import { draftMode } from "next/headers";
import "../globals.css";
import { VisualEditing } from "next-sanity/visual-editing";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Metadata, Viewport } from "next";
// import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import { sanityFetch } from "@/sanity/lib/live";
import Navbar from "@/components/Navbar/Navbar";
import LogoAnimation from "@/components/LogoAnimation";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import SmoothScroll from "@/components/SmoothScroll";
//import { Toaster } from "sonner";

const MobileAccountNav = dynamic(
  () => import("@/components/Navbar/MobileNavbar"),
);
const Footer = dynamic(() => import("@/components/Footer/Footer"));

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "Boutique Law Firm in Prince Albert, Saskatchewan| Netspire",
  description:
    "Netspire  & Associates is a boutique law firm in Prince Albert, Saskatchewan, offering personalized legal services with a focus on excellence and client satisfaction. Discover our tailored approach to meeting your legal needs.",
  keywords: [
    "Law Firm Prince Albert",
    "Legal Services",
    "Efficient Legal Solutions",
    "Effective Legal Assistance",
    "Prince Albert Lawyers",
    "Legal Advice",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}`,
  },
  icons: {
    icon: "/favicon.png",
  },
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initial = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      data-sanity-edit-target
    >
      <body className="bg-white h-auto! antialiased  ">
        <SmoothScroll>
          <Navbar settingsData={initial.data} />
          <MobileAccountNav settingsData={initial.data} />
          <LogoAnimation settingsData={initial.data} />
          <div vaul-drawer-wrapper="" className="bg-white min-h-screen">
            {children}
          </div>
          <VisualEditing />
          {/* <Toaster /> */}
          <Footer
            settingsData={
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
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}{" "}
        </SmoothScroll>
      </body>
    </html>
  );
}
