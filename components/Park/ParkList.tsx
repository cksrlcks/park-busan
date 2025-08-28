"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { useTabStore } from "@/stores/useTabStore";
import ParkItem from "@/components/Park/ParkItem";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useParkQuery from "@/hooks/useParkQuery";
import Inner from "../Inner";
import Loading from "../Loading";
import MapList from "../Map/MapList";
import ParkTabsHeader from "./ParkTabsHeader";

export default function ParkList() {
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const { lastTab } = useTabStore();
  const { favorites } = useFavoriteStore();
  const [isMapView, setIsMapView] = useState(false);

  if (isLoading) return <Loading>공영주차장 데이터를 불러오는중입니다</Loading>;
  if (!data) return notFound();

  const { lastFetchedAt, data: ParkData } = data;
  const firstKey = lastTab || ParkData[0].sigunguName;
  const favoriteParks = ParkData.flatMap(({ parks }) => parks).filter((park) =>
    favorites.includes(park.parkingId),
  );

  const parkList = [
    ...ParkData,
    { sigunguName: "favorites", parks: favoriteParks },
  ];

  return (
    <Tabs defaultValue={firstKey}>
      <ParkTabsHeader
        tabs={ParkData.map(({ sigunguName, parks }) => ({
          sigunguName,
          parkCount: parks.length,
        }))}
        isMapView={isMapView}
        onToggleMap={() => setIsMapView((prev) => !prev)}
        lastFetchedAt={lastFetchedAt}
        refetch={refetch}
        isFetching={isFetching}
      />

      <Inner>
        {parkList.map(({ sigunguName, parks }) => (
          <TabsContent key={sigunguName} value={sigunguName} className="pb-10">
            {parks.length ? (
              isMapView ? (
                <MapList parks={parks} />
              ) : (
                <ul className="space-y-2">
                  {parks.map((park) => (
                    <li key={park.parkingId}>
                      <Link href={`/park/${park.parkingId}`}>
                        <ParkItem park={park} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <div className="flex flex-col items-center gap-2 px-4 py-8 text-center text-sm text-gray-500">
                <span className="text-[30px]">
                  {sigunguName === "favorites" ? "🫠" : "😫"}
                </span>
                <span>
                  {sigunguName === "favorites" ? (
                    <>
                      즐겨찾기한 <br /> 주차장이 없습니다.
                    </>
                  ) : (
                    <>
                      선택하신 지역에는 <br />
                      공영주차장이 없습니다.
                    </>
                  )}
                </span>
              </div>
            )}
          </TabsContent>
        ))}
      </Inner>
    </Tabs>
  );
}
