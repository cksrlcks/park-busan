"use client";

import { useKakaoLoader, Map } from "react-kakao-maps-sdk";

type MapProps = {
  lat: string;
  lng: string;
};

export default function ParkMap({ lat, lng }: MapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
  });

  return (
    <Map
      center={{
        lat: Number(lat),
        lng: Number(lng),
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={3}
    />
  );
}
