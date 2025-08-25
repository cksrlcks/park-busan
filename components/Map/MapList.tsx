"use client";

import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";
import { useRouter } from "next/navigation";
import { generateMarkerIcon, getCenterLatLng } from "@/lib/map";
import { ParkItem } from "@/types";

type MapListProps = {
  parks: ParkItem[];
};

export default function MapList({ parks }: MapListProps) {
  const router = useRouter();
  const navermaps = useNavermaps();
  const bounds = new navermaps.LatLngBounds();

  parks.forEach((p) => {
    const lat = Number(p.lat);
    const lng = Number(p.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      bounds.extend(new navermaps.LatLng(lat, lng));
    }
  });

  const isSmall = parks.length < 3;
  const smallCenter = isSmall
    ? getCenterLatLng(
        parks
          .filter((p) => p.lat && p.lng)
          .map((p) => ({ lat: Number(p.lat), lng: Number(p.lng) }))
          .filter(
            (c) =>
              Number.isFinite(c.lat) &&
              Number.isFinite(c.lng) &&
              !(c.lat === 0 && c.lng === 0),
          ),
      )
    : null;

  return (
    <div className="bg-muted mb-4 flex aspect-[1/1.2] items-center justify-center overflow-hidden rounded-md border">
      <MapDiv className="flex h-full w-full items-center justify-center">
        <NaverMap
          {...(smallCenter
            ? { defaultCenter: smallCenter, defaultZoom: 13 }
            : { bounds })}
        >
          {parks.map((park) => (
            <Marker
              key={park.parkingId}
              defaultPosition={new navermaps.LatLng(park.lat, park.lng)}
              onClick={() => router.push(`/park/${park.parkingId}`)}
              icon={{
                content: generateMarkerIcon(park),
              }}
            />
          ))}
        </NaverMap>
      </MapDiv>
    </div>
  );
}
