import { Separator } from "@/components/ui/separator";

const ContactInfo = ({ settings }: { settings: any }) => {
  return (
    <section className="section-padding">
      <div className="max-w-container mx-auto">
        <div className="w-full">
          <Separator className="border" />
          <div className="grid 900:grid-cols-2 gap-5">
            <div className="grid grid-cols-2 py-3">
              <div className="font-bold text-2xl 1200:text-3xl">
                {settings?.contact?.contact?.city}
              </div>
              <div className="flex flex-col items-end 900:items-start">
                <div className="text-sm 1200:text-lg font-semibold">
                  <p>{settings?.contact?.contact?.email}</p>
                  <p>{settings?.contact?.contact?.phone}</p>
                  Isbister <br />
                  <p>{settings?.contact?.contact?.streetAddress}</p>
                  <p>{`${settings?.contact?.contact?.city}, ${settings?.contact?.contact?.postalCode}`}</p>
                  <p>{settings?.contact?.contact?.province}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-end ">
              <div className="w-full flex justify-between items-center py-3">
                <span className="font-bold text-xl 1200:text-3xl">
                  Join the team
                </span>
                <span className="text-sm 1200:text-lg font-semibold underline">
                  {settings?.contact?.contact?.email}
                </span>
              </div>
              <Separator className="border" />
              <div className="w-full flex justify-between items-center py-3">
                <span className="font-bold text-xl 1200:text-3xl">
                  Media enquiries
                </span>
                <span className="text-sm 1200:text-lg font-semibold underline">
                  {settings?.contact?.contact?.email}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-16 pb-4">
            <p className="1200:text-xl font-semibold">
              <span className="font-bold text-xl 1200:text-3xl mr-3 1200:mr-4">
                Isbister
              </span>
              changing the future of law firms
            </p>
          </div>
          <Separator className="border" />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
