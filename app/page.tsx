import Parking from "@/components/Parking";

export default function Home() {
  return (
    <div>
      <h1 className="text-center font-semibold text-lg mb-3">
        부산공영주차장 주차가능 현황
      </h1>
      <Parking />
    </div>
  );
}
