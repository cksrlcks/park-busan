import { useQuery } from "@tanstack/react-query";
import { ParkItem } from "@/types";

type ParkDataResponse = {
  lastFetchedAt: string;
  data: Record<string, ParkItem[]>;
};

export default function useParkQuery() {
  return useQuery<ParkDataResponse>({
    queryKey: ["park"],
    queryFn: async () => {
      const res = await fetch("/api/park");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
