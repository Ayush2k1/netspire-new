import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import formatPhoneNumber from "@/utils/formatPhone";
import TWallpaper from "@twallpaper/react";
import "@twallpaper/react/css";
import { SanityImage } from "@/sanity/lib/sanity-image";
import Newsletter from "../Contact/Newsletter";

const Footer = ({
  settingsData,
}: {
  settingsData: any & {
    gradient: {
      colorPicker1: { hex: string };
      colorPicker2: { hex: string };
      colorPicker3: { hex: string };
      colorPicker4: { hex: string };
    };
  };
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="">
      <Newsletter />
      <section className="section-padding w-full bg-white">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col 550:grid 550:grid-cols-4  1050:grid-cols-12 gap-20 1050:gap-6">
            <div className="col-span-4 1050:col-span-3 w-full ">
              <div className="max-w-[200px] mx-auto flex items-center 1050:items-start justify-center 1050:justify-start">
                <Link href={"/"}>
                  {settingsData?.logoLight && (
                    <SanityImage
                      data={settingsData.logoLight}
                      alt={settingsData.logoLight.alt}
                    />
                  )}
                </Link>
              </div>
            </div>

            {settingsData?.footer?.links &&
              settingsData?.footer?.links?.length > 0 &&
              settingsData.footer.links.map((link: any, index: any) => (
                <div
                  key={`footer-${index}`}
                  className="550:col-span-4 1050:col-span-3  flex flex-col gap-4"
                >
                  <h4 className="text-center 1050:text-left text-2xl italic">
                    {link.heading}
                  </h4>
                  <div className="text-center 1050:text-left flex flex-col gap-2 text-lg ">
                    {link.links && link.links?.length > 0 ? (
                      link.links.map((li: any, index: any) => (
                        <div
                          key={`footer-item-${index}`}
                          className="text-gray-600 hover:text-black animations"
                        >
                          <Link href={li.url}>{li.title}</Link>
                        </div>
                      ))
                    ) : (
                      <div className="p-4">No Links found</div>
                    )}
                  </div>
                </div>
              ))}

            <div className="550:col-span-4 1050:col-span-3  flex flex-col gap-4">
              <h4 className="text-center 1050:text-left text-2xl italic">
                Contact Us
              </h4>
              <div className="text-center 1050:text-left flex flex-col gap-2 text-lg ">
                {settingsData?.contact?.contact?.email && (
                  <Link
                    href={`mailto:${settingsData.contact.contact.email}`}
                    className="text-gray-600 hover:text-black animations"
                  >
                    Em: {settingsData.contact.contact.email}
                  </Link>
                )}
                {settingsData?.contact?.contact?.phone && (
                  <Link
                    href={`tel:${settingsData.contact.contact.phone}`}
                    className="text-gray-600 hover:text-black animations"
                  >
                    Ph:{" "}
                    {formatPhoneNumber(
                      settingsData.contact?.contact?.phone.toString(),
                    )}
                  </Link>
                )}
                {settingsData?.contact?.contact?.fax && (
                  <Link
                    href={`tel:${settingsData.contact.contact.fax}`}
                    className="text-gray-600 hover:text-black animations"
                  >
                    Fax: {formatPhoneNumber(settingsData.contact.contact.fax)}
                  </Link>
                )}

                {settingsData?.contact?.contact && (
                  <div className="text-gray-600 hover:text-black animations text-base ">
                    {settingsData.contact.contact.streetAddress} <br />
                    {settingsData.contact.contact.city},{" "}
                    {settingsData.contact.contact.province},{" "}
                    {settingsData.contact.contact.postalCode}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Separator className="bg-gray-300" />
      <section className="p-8 shadow-2xl shadow-black/20 bg-white">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col 850:flex-row justify-center 850:justify-between items-center 850:items-start  ">
            <div className=" !whitespace-nowrap flex flex-col 450:flex-row items-center text-gray-600 850:text-left text-center">
              <p className="mr-1 flex items-center flex-row">
                cc All Rights Reserved.
              </p>

              <Link
                href="https://www.netspire.ca/"
                target="_blank"
                className="hover:border-black animations  ml-1 border-b border-white hover:text-black"
              >
                Built By Netspire.
              </Link>
            </div>

            <div className="flex items-center gap-2  text-gray-600">
              <Link
                href="/privacy-policy"
                className="border-b border-white hover:border-b hover:border-black hover:text-black animations"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="border-b border-white hover:border-b hover:border-black hover:text-black animations"
              >
                Terms And Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[300px] bg-red-200  -z-[1] relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {settingsData?.gradient && (
            <TWallpaper
              className="gradient-bg"
              options={{
                colors: [
                  settingsData?.gradient?.colorPicker1?.hex,
                  settingsData?.gradient?.colorPicker2?.hex,
                  settingsData?.gradient?.colorPicker3?.hex,
                  settingsData?.gradient?.colorPicker4?.hex,
                ],
                fps: 50,
                // pattern: {
                //   blur: 3,
                //   size: "100",
                //   background: "#000",
                //   image:
                //     "https://cdn.sanity.io/images/xz3v5vl6/production/06cbd8baf0d9760b7333ca7d9b59efe078b6bbe6-700x700.svg",
                // },
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Footer;
