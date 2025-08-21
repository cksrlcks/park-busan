"use client";

import ParkItem from "@/components/ParkItem";
import { ParkItem as ParkItemType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type ParkDataResponse = {
  lastFetchedAt: string;
  data: Record<string, ParkItemType[]>;
};

export default function Parking() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  const { data, isLoading, isFetching, refetch } = useQuery<ParkDataResponse>({
    queryKey: ["park"],
    queryFn: async () => {
      const res = await fetch("/api/park");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  useEffect(() => {
    if (!sentinelRef.current || !data) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting);
    });

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [data]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Spinner className="text-black" />
        <span className="text-muted-foreground text-sm">
          공영주차장 데이터를 불러오는중입니다
        </span>
      </div>
    );
  if (!data) return <div>No data</div>;

  const { lastFetchedAt, data: ParkData } = data;
  const firstKey = Object.keys(ParkData)[0];

  return (
    <div>
      <div ref={sentinelRef} />
      <Tabs defaultValue={firstKey}>
        <TabsList
          className={cn(
            "sticky px-4 top-0 z-10 bg-white py-3 rounded-none",
            isSticky && "border-b border-gray-100"
          )}
        >
          {Object.keys(ParkData).map((addr) => (
            <TabsTrigger key={addr} value={addr}>
              {addr}
            </TabsTrigger>
          ))}

          <div className="text-sm text-muted-foreground text-right w-full pt-4">
            최근 조회 :{" "}
            {new Date(lastFetchedAt).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
            })}
          </div>
        </TabsList>

        <div className="px-4">
          {Object.entries(ParkData).map(([addr, parks]) => (
            <TabsContent key={addr} value={addr} className="pb-10">
              <ul className="space-y-2">
                {parks.map((park) => (
                  <li key={park.parkingId}>
                    <ParkItem item={park} />
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </div>

        <div className="fixed bottom-2 w-full max-w-[240px] left-1/2 -translate-x-1/2 px-4">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="bg-black w-full flex h-10 cursor-pointer text-white rounded-sm text-md items-center justify-center"
          >
            {isFetching ? <Spinner /> : "새로고침"}
          </button>
        </div>
      </Tabs>
    </div>
  );
}
