"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Map } from "lucide-react";
import { useFavoriteStore } from "@/app/stores/useFavoriteStore";
import { useTabStore } from "@/app/stores/useTabStore";
import ParkItem from "@/components/Park/ParkItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStickyContext } from "@/context/StickyProvider";
import useParkQuery from "@/hooks/useParkQuery";
import { cn } from "@/lib/utils";
import Loading from "../Loading";
import MapList from "../Map/MapList";
import Spinner from "../Spinner";
import { Button } from "../ui/button";

export default function ParkList() {
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const { isSticky } = useStickyContext();
  const { lastTab, setLastTab } = useTabStore();
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
    <>
      <Tabs defaultValue={firstKey}>
        <TabsList
          className={cn(
            "sticky top-0 z-10 rounded-none bg-white px-4 py-3",
            isSticky && "border-b border-gray-100",
          )}
        >
          {Object.keys(ParkData)
            .sort((a, b) => a.localeCompare(b))
            .map((addr) => (
              <TabsTrigger
                key={addr}
                value={addr}
                onClick={() => setLastTab(addr)}
              >
                {addr}
              </TabsTrigger>
            ))}
          <TabsTrigger
            value="favorites"
            onClick={() => setLastTab("favorites")}
          >
            즐겨찾기
          </TabsTrigger>

          <div className="flex w-full items-center justify-between pt-4">
            <div className="flex items-center gap-1">
              <Button
                onClick={() => refetch()}
                disabled={isFetching}
                variant="outline"
                size="sm"
              >
                {isFetching ? (
                  <Spinner className="h-4 w-4 text-black" />
                ) : (
                  "새로고침"
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  isMapView && "border-blue-300 bg-blue-100/50 text-blue-700",
                )}
                onClick={() => setIsMapView((prev) => !prev)}
              >
                <Map />
                지도
              </Button>
            </div>
            <div className="text-muted-foreground text-xs tracking-tight">
              최근 조회 :{" "}
              {new Date(lastFetchedAt).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              })}
            </div>
          </div>
        </TabsList>

        <div className="px-4">
          {parkList.map(([addr, parks]) => (
            <TabsContent key={addr} value={addr} className="pb-10">
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
        </div>
      </Tabs>
    </>
  );
}
