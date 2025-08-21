import Parking from "@/components/Parking";
import StickyProvider from "@/context/StickyProvider";

export default function Home() {
  return (
    <div>
      <h1 className="mb-3 text-center text-lg font-semibold">
        부산공영주차장 주차가능 현황
      </h1>
      <StickyProvider>
        <Parking />
      </StickyProvider>
    </div>
  );
}
