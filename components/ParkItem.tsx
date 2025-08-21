import { ParkItem as ParkItemType } from "@/types";
import React from "react";

type ParkItemProps = {
  item: ParkItemType;
};
export default function ParkItem({ item }: ParkItemProps) {
  return (
    <div className="flex w-full justify-between items-center border border-gray-100 p-6 rounded-lg shadow-xs">
      <div className="flex-1">
        <h2 className="font-medium">{item.parkingName}</h2>
        <div className="text-sm text-gray-500">
          {item.addr} {item.addrDetail}
        </div>
      </div>
      <div className="text-lg font-bold">
        {item.parkCount} / {item.cellCount}
      </div>
    </div>
  );
}
