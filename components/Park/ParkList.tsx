"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useFavoriteStore } from "@/app/stores/useFavoriteStore";
import { useTabStore } from "@/app/stores/useTabStore";
import ParkItem from "@/components/Park/ParkItem";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useParkQuery from "@/hooks/useParkQuery";
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
  const firstKey = lastTab || Object.keys(ParkData)[0];
  const favoriteParks = Object.values(ParkData)
    .flat()
    .filter((park) => favorites.includes(park.parkingId));

  const parkList = [
    ...Object.entries(ParkData),
    ["favorites", favoriteParks] as [string, typeof favoriteParks],
  ];

  return (
    <Tabs defaultValue={firstKey}>
      <ParkTabsHeader
        tabs={Object.keys(ParkData).sort((a, b) => a.localeCompare(b))}
        isMapView={isMapView}
        onToggleMap={() => setIsMapView((prev) => !prev)}
        lastFetchedAt={lastFetchedAt}
        refetch={refetch}
        isFetching={isFetching}
      />

      {parkList.map(([addr, parks]) => (
        <TabsContent key={addr} value={addr} className="px-4 pb-10">
          {isMapView ? (
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
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
