import { ParkItem as ParkItemType } from "@/types";
import { Separator } from "../ui/separator";

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
      <h3 className="mb-4 flex items-center text-sm font-medium tracking-tight">
        주차장 정보
      </h3>
      <ul className="space-y-1 text-sm tracking-tight">
        {infoData.map((item) => (
          <li key={item.label} className="flex justify-between">
            <span className="text-muted-foreground text-sm">{item.label}</span>
            <span className="text-sm font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
      <Separator className="my-3 bg-gray-100" />
      <ul className="space-y-1 text-sm tracking-tight">
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
