"use client";

import ParkItem from "@/components/ParkItem";
import { ParkItem as ParkItemType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ParkDataResponse = {
  lastFetchedAt: string;
  data: Record<string, ParkItemType[]>;
};

export default function Parking() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const { data, isLoading, isFetching, refetch } = useQuery<ParkDataResponse>({
    queryKey: ["park"],
    queryFn: async () => {
      const res = await fetch("/api/park");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const { lastFetchedAt, data: ParkData } = data;
  const firstKey = Object.keys(ParkData)[0];
  console.log(isSticky);
  return (
    <>
      <div ref={sentinelRef} />
      <Tabs defaultValue={firstKey}>
        <TabsList
          className={cn(
            "sticky px-4 top-0 z-10 bg-white py-3 rounded-none",
            isSticky && "border-b border-gray-100 shadow-xs"
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
            {isFetching ? (
              <svg
                className="size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "새로고침"
            )}
          </button>
        </div>
      </Tabs>
    </>
  );
}
