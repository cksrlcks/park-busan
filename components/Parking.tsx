"use client";

import Link from "next/link";
import ParkItem from "@/components/ParkItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStickyContext } from "@/context/StickyProvider";
import useParkQuery from "@/hooks/useParkQuery";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

export default function Parking() {
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const { isSticky } = useStickyContext();

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-40">
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
      <Tabs defaultValue={firstKey}>
        <TabsList
          className={cn(
            "sticky top-0 z-10 rounded-none bg-white px-4 py-3",
            isSticky && "border-b border-gray-100",
          )}
        >
          {Object.keys(ParkData).map((addr) => (
            <TabsTrigger key={addr} value={addr}>
              {addr}
            </TabsTrigger>
          ))}

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
        </div>
      </Tabs>
    </div>
  );
}
