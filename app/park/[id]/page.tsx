"use client";

import { use } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ChevronLeftIcon, RefreshCwIcon } from "lucide-react";
import ParkItem from "@/components/ParkItem";
import ParkMap from "@/components/ParkMap";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useParkQuery from "@/hooks/useParkQuery";

export default function ParkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  const { lastFetchedAt, data: parkList } = data;

  const parkData = Object.values(parkList)
    .flat()
    .find((park) => park.parkingId === Number(id));

  if (!parkData) notFound();

  return (
    <ViewTransition>
      <div className="mb-4 flex items-center justify-between">
        <Button type="button" variant="outline" size="icon" asChild>
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <Spinner className="h-4 w-4 text-black" />
          ) : (
            <RefreshCwIcon />
          )}
        </Button>
      </div>
      <div className="bg-muted mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-md">
        {/* <ParkMap lat={parkData.lat} lng={parkData.lng} /> */}
        <span className="text-muted-foreground text-sm">
          지도API 심사 대기중
        </span>
      </div>
      <div className="mb-4">
        <ParkItem item={parkData} />
      </div>
      <ul className="text-sm">
        <li>
          <span>전화번호:</span>
          <span>{parkData.telNo}</span>
        </li>
        <li>
          <span>주차면수:</span>
          <span>{parkData.cellCount}</span>
        </li>
      </ul>
    </ViewTransition>
  );
}
