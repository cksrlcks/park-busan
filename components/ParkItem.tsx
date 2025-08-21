import React from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { ParkItem as ParkItemType } from "@/types";

type ParkItemProps = {
  item: ParkItemType;
};
export default function ParkItem({ item }: ParkItemProps) {
  return (
    <ViewTransition name={`park-${item.parkingId}`}>
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-100 p-6 shadow-xs">
        <div className="flex-1">
          <h2 className="font-medium tracking-tight">{item.parkingName}</h2>
          <p className="text-sm text-gray-500">
            {item.addr} {item.addrDetail}
          </p>
        </div>
        <div className="text-lg font-bold">
          {item.parkCount} / {item.cellCount}
        </div>
      </div>
    </ViewTransition>
  );
}
