import Image from "next/image";
import { Info } from "lucide-react";
import Inner from "../Inner";

export default function ParkListTitle() {
  return (
    <Inner>
      <h1 className="mb-3 flex flex-col tracking-tight">
        <Image
          src="/icon-512x512.png"
          width={40}
          height={40}
          alt="park-busan"
          className="mb-4 rounded-sm"
        />
        <span className="text-2xl font-bold">부산광역시 공영주차장</span>
        <span className="text-lg font-medium opacity-70">실시간 주차현황</span>
      </h1>
      <p className="mb-3 text-sm tracking-tight text-gray-600">
        실시간 주차 정보는 약간의 시간차가 있을 수 있습니다. 데이터가 정확하지
        않다면 새로고침하거나, 참고용으로만 활용해 주시길 바랍니다.
      </p>
      <p className="mb-3 flex items-center gap-1.5 text-sm font-medium tracking-tight text-blue-500">
        <Info size={14} className="shrink-0" /> 각 주차장 정보에 표기된 숫자는
        &apos;빈자리/총면수&apos;를 의미합니다.
      </p>
    </Inner>
  );
}
