"use client";

import { useState } from "react";
import Script from "next/script";
import Spinner from "./Spinner";

type MapProps = {
  lat: string;
  lng: string;
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

export default function ParkMap({ lat, lng }: MapProps) {
  const initializeMap = () => {
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(Number(lat), Number(lng)),
      zoom: 17,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(Number(lat), Number(lng)),
      map: map,
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY}`}
        onReady={initializeMap}
      />
      <div
        id="map"
        className="flex h-full w-full items-center justify-center overflow-hidden border"
      >
        <Spinner className="text-black" />
      </div>
    </>
  );
}
