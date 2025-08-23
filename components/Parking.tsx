"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useTabStore } from "@/app/stores/useTabStore";
import ParkItem from "@/components/ParkItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStickyContext } from "@/context/StickyProvider";
import useParkQuery from "@/hooks/useParkQuery";
import { cn } from "@/lib/utils";
import Loading from "./Loading";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

export default function Parking() {
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const { isSticky } = useStickyContext();
  const [favorites, setFavorites] = useState<number[]>([]);
  const { lastTab, setLastTab } = useTabStore();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [data]);

  if (isLoading) return <Loading>공영주차장 데이터를 불러오는중입니다</Loading>;
  if (!data) return notFound();

  const { lastFetchedAt, data: ParkData } = data;
  const firstKey = lastTab || Object.keys(ParkData)[0];

  return (
    <div>
      <Tabs defaultValue={firstKey}>
        <TabsList
          className={cn(
            "sticky top-0 z-10 rounded-none bg-white px-4 py-3",
            isSticky && "border-b border-gray-100",
          )}
        >
          {Object.keys(ParkData).map((addr) => (
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
            <div className="text-muted-foreground text-sm">
              최근 조회 :{" "}
              {new Date(lastFetchedAt).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              })}
            </div>
          </div>
        </TabsList>

        <div className="px-4">
          {Object.entries(ParkData).map(([addr, parks]) => (
            <TabsContent key={addr} value={addr} className="pb-10">
              <ul className="space-y-2">
                {parks.map((park) => (
                  <li key={park.parkingId}>
                    <Link href={`/park/${park.parkingId}`}>
                      <ParkItem item={park} />
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
          <TabsContent value="favorites" className="pb-10">
            <ul className="space-y-2">
              {Object.values(ParkData)
                .flat()
                .filter((park) => favorites.includes(park.parkingId))
                .map((park) => (
                  <li key={park.parkingId}>
                    <Link href={`/park/${park.parkingId}`}>
                      <ParkItem item={park} />
                    </Link>
                  </li>
                ))}
            </ul>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
