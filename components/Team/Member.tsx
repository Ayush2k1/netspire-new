import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SanityImage } from "@/sanity/lib/sanity-image";
import TWallpaper from "@twallpaper/react";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

const Member = ({ data }: { data: any }) => {
  return (
    <div className="bg-transparent overflow-hidden">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="relative h-[30vh] 600:h-[35vh] 1000:h-[40vh] w-screen">
          {data?.gradient && (
            <TWallpaper
              style={{
                position: "static",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              options={{
                colors: [
                  data?.gradient?.colorPicker1?.hex ?? "#000",
                  data?.gradient?.colorPicker2?.hex ?? "#000",
                  data?.gradient?.colorPicker3?.hex ?? "#000",
                  data?.gradient?.colorPicker4?.hex ?? "#000",
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
        <div className="section-padding pt-20">
          <div className="flex flex-col gap-6 650:gap-8 max-w-small mx-auto">
            <div className="flex flex-row items-center gap-4  ">
              <div className="w-[70px] 500:w-[100px]">
                {data?.image?.asset && (
                  <AspectRatio
                    ratio={1 / 1}
                    className=" rounded-full overflow-hidden "
                  >
                    <SanityImage
                      data={data.image}
                      alt={
                        data?.image?.alt || "Boutique Law Firm in Prince Albert"
                      }
                      className="object-center object-cover "
                      sizes="(max-width: 700px) 50vw, 20vw"
                    />
                  </AspectRatio>
                )}
              </div>
              <div className="flex flex-row items-start gap-4">
                <div className="flex flex-col ">
                  {data?.firstName && data?.lastName && (
                    <h3 className="overide-font-sans text-xl 450:text-2xl font-semibold capitalize">
                      {data?.firstName} {data?.lastName}
                    </h3>
                  )}
                  {data?.position && (
                    <p className="text-lg font-semibold text-gray-500">
                      {data?.position.position}
                    </p>
                  )}
                </div>

                {data?.linkdin && (
                  <Link href={data.linkdin} target="_blank">
                    <Button size="icon" variant="secondary">
                      <FaLinkedinIn />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <Separator />

            <div className="flex flex-row items-center justify-between">
              {data?.email && (
                <div className="flex flex-col gap-1">
                  <h4 className="overide-font-sans text-xl font-semibold text-gray-500">
                    Email
                  </h4>
                  <p className="text-xl font-semibold ">{data?.email}</p>
                </div>
              )}

              <div></div>
            </div>

            {data?.bio && (
              <div className="flex flex-col gap-1">
                <h4 className="overide-font-sans text-xl font-semibold text-gray-500">
                  Bio
                </h4>

                <p className="font-normal">{data?.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
