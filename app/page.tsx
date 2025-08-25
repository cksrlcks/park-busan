import ParkList from "@/components/Park/ParkList";
import ParkListTitle from "@/components/Park/ParkListTitle";
import StickyProvider from "@/context/StickyProvider";

export default function Home() {
  return (
    <>
      <ParkListTitle>부산공영주차장 주차가능 현황</ParkListTitle>
      <StickyProvider>
        <ParkList />
      </StickyProvider>
    </>
  );
}
