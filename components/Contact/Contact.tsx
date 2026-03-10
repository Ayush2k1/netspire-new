import { StylizeHeading } from "@/utils/stylizeHeading";
import formatPhoneNumber from "@/utils/formatPhone";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
// import ContactForm from "../Form/FormContactPage";

//const ContactMap = dynamic(() => import("./ContactMap"));

const Contact = async ({ settings }: { settings: any }) => {
  return (
    <section className="section-padding pt-[150px] 650:pt-[200px]">
      <div className="max-w-container mx-auto flex flex-col gap-20">
        <div className="grid grid-cols-2 gap-10 w-full  ">
          <div className="col-span-2 1000:col-span-1 flex flex-col gap-6 w-full ">
            <div className=" flex flex-col gap-2">
              <h1 className="text-4xl">Contact {StylizeHeading("Us")}</h1>
              <p className="text-lg text-gray-600 ">
                Let&apos;s start a conversation. We&apos;re here to listen!
              </p>
            </div>

            <div className=" flex flex-col gap-2">
              {settings?.contact?.contact?.email && (
                <Link
                  href={`mailto:${settings?.contact?.contact?.email}`}
                  className="text-lg font-medium"
                >
                  Em: {settings?.contact?.contact?.email}
                </Link>
              )}
              {settings?.contact?.contact?.phone && (
                <Link
                  href={`tel:${settings?.contact?.contact?.phone}`}
                  className="text-lg font-medium"
                >
                  Ph:{" "}
                  {formatPhoneNumber(
                    settings?.contact?.contact?.phone.toString(),
                  )}
                </Link>
              )}
              {settings?.contact?.contact?.fax && (
                <Link
                  href={`tel:${settings?.contact?.contact?.fax}`}
                  className="text-lg font-medium"
                >
                  Fax: {formatPhoneNumber(settings?.contact?.contact?.fax)}
                </Link>
              )}
            </div>
            <p className="text-gray-600 italic">
              Please be aware that communication through this Website, including
              the use of any contact or appointment forms, does not establish a
              lawyer-client relationship. We advise against sending confidential
              or time-sensitive information through this form. If you need to
              discuss confidential or urgent legal matters, please contact us
              directly by phone or in person.
            </p>
          </div>
          {/* <div className="col-span-2 1000:col-span-1 h-full">
            <ContactForm />
          </div> */}
        </div>
        <Separator className="w-full bg-gray-200" />
        {/* <ContactMap settings={settings as any} /> */}
        {/* <ContactInfo settings={settings as SETTINGS_QUERYResult} /> */}
      </div>
    </section>
  );
};

export default Contact;
