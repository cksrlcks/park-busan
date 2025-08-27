import ParkList from "@/components/Park/ParkList";
import ParkListTitle from "@/components/Park/ParkListTitle";
import StickyProvider from "@/context/StickyProvider";

export default function Home() {
  return (
    <>
      <ParkListTitle />
      <StickyProvider>
        <ParkList />
      </StickyProvider>
    </>
  );
}
