import { ParkItem as ParkItemType } from "@/types";
import ParkItem from "./ParkItem";
import ParkMap from "./ParkMap";
import { Separator } from "./ui/separator";

type ParkDetailProps = {
  park: ParkItemType;
};

export default function ParkDetail({ park }: ParkDetailProps) {
  const infoData = [
    { label: "전화번호", value: park.telNo },
    { label: "주차면수", value: park.cellCount },
  ];

  const countData = [
    { label: "장애인 주차면수", value: park.handicapCellCount },
    { label: "소형차 주차면수", value: park.smallCarCellCount },
    { label: "전기차 주차면수", value: park.electricCellCount },
    { label: "노인 전용 주차면수", value: park.elderlyCellCount },
    { label: "여성 전용 주차면수", value: park.womanFirstCellCount },
  ];

  return (
    <>
      <div className="bg-muted mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-md">
        <ParkMap lat={park.lat} lng={park.lng} />
      </div>
      <div className="mb-4">
        <ParkItem item={park} />
      </div>
      <div>
        <h3 className="text-muted-foreground/60 mb-4 flex items-center text-sm">
          🚗 주차장 정보
        </h3>
      </div>
      <ul className="space-y-1 text-sm">
        {infoData.map((item) => (
          <li key={item.label} className="flex justify-between">
            <span className="text-muted-foreground text-sm">{item.label}</span>
            <span className="text-sm font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
      <Separator className="my-3" />
      <ul className="space-y-1 text-sm">
        {countData.map((item) => (
          <li key={item.label} className="flex justify-between">
            <span className="text-muted-foreground text-sm">{item.label}</span>
            <span className="text-sm font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
