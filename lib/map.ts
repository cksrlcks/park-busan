import { ParkItem } from "@/types";

export const DEFAULT_CENTER = { lat: 35.1796, lng: 129.0756 };
export type LatLng = { lat: number; lng: number };

export const generateMarkerIcon = (park: ParkItem) => {
  return `
    <div class="absolute flex flex-col items-center select-none cursor-pointer -translate-x-1/2 -translate-y-6  bg-red">
        <div class="w-5 h-5 bg-black rounded-sm flex justify-center items-center shadow-md">
        <span class="text-white text-[11px] font-bold">P</span>
        </div>
        <div class="mt-1 text-black text-[11px] whitespace-nowrap font-semibold font-outline ">
        ${park.parkingName}
        </div>
    </div>
  `;
};

export const getCenterLatLng = (coords: LatLng[]): LatLng => {
  if (coords.length === 0) {
    return DEFAULT_CENTER;
  }

  const lats = coords.map((c) => c.lat);
  const lngs = coords.map((c) => c.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };
};
