import React from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { cn } from "@/lib/utils";
import { ParkingStatus, ParkItem as ParkItemType } from "@/types";

type ParkItemProps = {
  park: ParkItemType;
  time?: string;
};

const PARKING_STATUSES: ParkingStatus[] = [
  { key: "available", label: "여유", range: [0, 40] },
  { key: "normal", label: "보통", range: [40, 70] },
  { key: "crowded", label: "혼잡", range: [70, 90] },
  { key: "veryCrowded", label: "매우 혼잡", range: [90, 100] },
  { key: "full", label: "만차", range: [100, Infinity] },
];

const STATUS_CLASSES = {
  full: "bg-gray-200 text-gray-800",
  veryCrowded: "bg-red-100 text-red-600",
  crowded: "bg-orange-100 text-orange-600",
  normal: "bg-blue-100 text-blue-600",
  available: "bg-green-100 text-green-600",
} as const;

const getParkingStatus = (
  parkCount: number,
  cellCount: number,
): ParkingStatus => {
  if (cellCount <= 0) return PARKING_STATUSES.find((s) => s.key === "full")!;

  const occupancyRate = ((cellCount - parkCount) / cellCount) * 100;

  return (
    PARKING_STATUSES.find((status) => {
      const [min, max] = status.range;
      return occupancyRate >= min && occupancyRate < max;
    }) || PARKING_STATUSES[PARKING_STATUSES.length - 1]
  );
};

export default function ParkItem({ park, time }: ParkItemProps) {
  const parkingStatus = getParkingStatus(park.parkCount, park.cellCount);
  return (
    <ViewTransition name={`park-${park.parkingId}`}>
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-100 bg-white px-6 py-5 shadow-xs">
        <div className="flex-1">
          <span
            className={cn(
              STATUS_CLASSES[parkingStatus.key],
              "mb-1.5 inline-flex items-center justify-center rounded-sm px-[5px] py-0.5 text-xs font-medium",
            )}
          >
            {parkingStatus.label}
          </span>
          <h2 className="font-semibold tracking-tight">{park.parkingName}</h2>
          <p className="text-sm text-gray-500">
            {park.addr} {park.addrDetail}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div
            className={cn(
              "text-xl font-bold tracking-tight",
              parkingStatus.key === "full" ? "text-gray-400" : "",
            )}
          >
            {park.parkCount} / {park.cellCount}
          </div>
          {time && (
            <span className="text-xs text-gray-600">
              {new Date(time).toLocaleTimeString("ko-KR", {
                timeZone: "Asia/Seoul",
              })}{" "}
              업데이트됨
            </span>
          )}
        </div>
      </div>
    </ViewTransition>
  );
}
