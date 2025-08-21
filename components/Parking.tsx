"use client";

import ParkItem from "@/components/ParkItem";
import { ParkItem as ParkItemType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Parking() {
  const { data, isLoading, isFetching, refetch } = useQuery<
    Record<string, ParkItemType[]>
  >({
    queryKey: ["park"],
    queryFn: async () => {
      const res = await fetch("/api/park");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const firstKey = Object.keys(data)[0];

  return (
    <Tabs defaultValue={firstKey}>
      <TabsList>
        {Object.keys(data).map((addr) => (
          <TabsTrigger key={addr} value={addr}>
            {addr}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(data).map(([addr, parks]) => (
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

      <div className="fixed bottom-2 w-full max-w-sm left-1/2 -translate-x-1/2">
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="bg-black px-4 py-2 w-full flex cursor-pointer text-white rounded-sm text-md align-center justify-center"
        >
          {isFetching ? (
            <svg
              className="mr-3 -ml-1 size-5 animate-spin text-white"
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
  );
}
