import { useQuery } from "@tanstack/react-query";
import { ParkItem } from "@/types";

export type ParkDataResponse = {
  lastFetchedAt: string;
  data: { sigunguName: string; parks: ParkItem[] }[];
};

export default function useParkQuery() {
  return useQuery<ParkDataResponse>({
    queryKey: ["park"],
    queryFn: async () => {
      const res = await fetch("/api/park");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });
}
