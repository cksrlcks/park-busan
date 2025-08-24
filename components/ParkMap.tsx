"use client";

import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";
import { generateMarkerIcon } from "@/lib/map";
import { ParkItem } from "@/types";

type MapProps = {
  park: ParkItem;
};

export default function ParkMap({ park }: MapProps) {
  const navermaps = useNavermaps();

  return (
    <div className="bg-muted mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-md border">
      <MapDiv className="flex h-full w-full items-center justify-center">
        <NaverMap
          defaultCenter={
            new navermaps.LatLng(Number(park.lat), Number(park.lng))
          }
          defaultZoom={17}
        >
          <Marker
            defaultPosition={
              new navermaps.LatLng(Number(park.lat), Number(park.lng))
            }
            icon={{
              content: generateMarkerIcon(park),
            }}
          />
        </NaverMap>
      </MapDiv>
    </div>
  );
}
