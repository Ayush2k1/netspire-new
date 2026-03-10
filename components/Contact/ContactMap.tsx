"use client";
import React, { useEffect } from "react";
import Map, {
  FullscreenControl,
  NavigationControl,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "usehooks-ts";

const token = process.env.NEXT_PUBLIC_MAP_TOKEN;

const ContactMap = ({ settings }: { settings: any }) => {
  const [refKey, setRefKey] = React.useState(0);

  const isMobile = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setRefKey(refKey + 1);
  }, [isMobile]);

  return (
    <AspectRatio
      key={refKey}
      ratio={!isMobile ? 1 / 1 : 16 / 9}
      className="w-full rounded-lg overflow-hidden"
    >
      {/* <Map
        mapboxApiAccessToken={token}
        initialViewState={{
          longitude: -105.75399,
          latitude: 53.20038,
          zoom: 14,
          pitch: 70,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        reuseMaps
      >
        <NavigationControl />
        <FullscreenControl />
        <Marker longitude={-105.75399} latitude={53.20038}>
          <div className="bg-white p-4 rounded-xl relative flex flex-col gap-3">
            <p className="font-semibold text-lg">
              Isbister Coertze & Associates{" "}
            </p>

            <div>
              <p className="text-base">
                {settings?.contact?.contact?.streetAddress}
              </p>
              <p className="text-base">{`${settings?.contact?.contact?.city}, ${settings?.contact?.contact?.province}`}</p>
              <p className="text-base">
                {settings?.contact?.contact?.postalCode}
              </p>
            </div>
            <div className="rounded-md bg-white rotate-45 absolute h-8 w-8 left-1/2 -bottom-3 -translate-x-1/2"></div>
          </div>
        </Marker>
      </Map> */}
    </AspectRatio>
  );
};

export default ContactMap;
