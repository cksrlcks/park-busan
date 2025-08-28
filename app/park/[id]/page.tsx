"use client";

import { use } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { notFound } from "next/navigation";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import Loading from "@/components/Loading";
import ParkMap from "@/components/Map/ParkMap";
import ParkDetail from "@/components/Park/ParkDetail";
import ParkHeader from "@/components/Park/ParkDetailHeader";
import ParkItem from "@/components/Park/ParkItem";
import useParkQuery, { ParkDataResponse } from "@/hooks/useParkQuery";

const getParkDataWithId = (data: ParkDataResponse["data"], id: number) => {
  return data
    .flatMap(({ parks }) => parks)
    .find((park) => park.parkingId === id);
};

export default function ParkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const isFavorite = favorites.includes(Number(id));

  const handleFavorite = (parkingId: number) => {
    if (isFavorite) {
      removeFavorite(parkingId);
    } else {
      addFavorite(parkingId);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "주차검색기",
        text: "주차검색기",
        url: window.location.href,
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) return <Loading>주차장 정보를 가져오는 중입니다.</Loading>;
  if (!data) return <div>No data available</div>;

  const { data: parkList, lastFetchedAt } = data;
  const parkData = getParkDataWithId(parkList, Number(id));
  if (!parkData) notFound();

  return (
    <ViewTransition>
      <div className="px-4">
        <ParkHeader
          title={parkData.parkingName}
          isFavorite={isFavorite}
          onFavorite={() => handleFavorite(Number(id))}
          onRefetch={refetch}
          onShare={handleShare}
          isFetching={isFetching}
        />
        <ParkMap park={parkData} />
        <div className="mb-5">
          <ParkItem park={parkData} time={lastFetchedAt} />
        </div>
        <ParkDetail park={parkData} />
      </div>
    </ViewTransition>
  );
}
