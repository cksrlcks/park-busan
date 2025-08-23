"use client";

import { use, useEffect, useState } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { notFound } from "next/navigation";
import Loading from "@/components/Loading";
import ParkDetail from "@/components/ParkDetail";
import ParkHeader from "@/components/ParkHeader";
import useParkQuery, { ParkDataResponse } from "@/hooks/useParkQuery";

const getParkDataWithId = (data: ParkDataResponse["data"], id: number) => {
  return Object.values(data)
    .flat()
    .find((item) => item.parkingId === id);
};

export default function ParkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, isFetching, refetch } = useParkQuery();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!data) return;
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(stored.includes(Number(id)));
  }, [data, id]);

  const handleFavorite = (parkingId: number) => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated: number[];

    if (stored.includes(parkingId)) {
      updated = stored.filter((id: number) => id !== parkingId);
    } else {
      updated = [...stored, parkingId];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(updated.includes(parkingId));
  };

  if (isLoading) return <Loading>주차장 정보를 가져오는 중입니다.</Loading>;
  if (!data) return <div>No data available</div>;

  const { data: parkList } = data;
  const parkData = getParkDataWithId(parkList, Number(id));
  if (!parkData) notFound();

  return (
    <ViewTransition>
      <ParkHeader
        title={parkData.parkingName}
        isFavorite={isFavorite}
        onFavorite={() => handleFavorite(Number(id))}
        onRefetch={refetch}
        isFetching={isFetching}
      />
      <ParkDetail park={parkData} />
    </ViewTransition>
  );
}
