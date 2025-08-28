import React from "react";
import { Map } from "lucide-react";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { useTabStore } from "@/stores/useTabStore";
import { useStickyContext } from "@/context/StickyProvider";
import { cn } from "@/lib/utils";
import { ParkItem } from "@/types";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useConfigStore } from "@/stores/useConfigStore";

type ParkTabsHeaderProps = {
  tabs: {
    sigunguName: ParkItem["sigunguName"];
    parkCount: number;
  }[];
  isMapView: boolean;
  onToggleMap: () => void;
  lastFetchedAt: string;
  refetch: () => void;
  isFetching: boolean;
};

export default function ParkTabsHeader({
  tabs,
  isMapView,
  onToggleMap,
  lastFetchedAt,
  refetch,
  isFetching,
}: ParkTabsHeaderProps) {
  const { isSticky } = useStickyContext();
  const { setLastTab } = useTabStore();
  const { favorites } = useFavoriteStore();
  const { config, setConfig } = useConfigStore();

  return (
    <TabsList
      className={cn(
        "sticky top-0 z-10 rounded-none bg-white px-4 py-3",
        isSticky && "border-b border-gray-100",
      )}
    >
      {tabs.map(({ sigunguName, parkCount }) => (
        <TabsTrigger
          key={sigunguName}
          value={sigunguName}
          onClick={() => setLastTab(sigunguName)}
        >
          {sigunguName} <b>{parkCount}</b>
        </TabsTrigger>
      ))}

      <TabsTrigger value="favorites" onClick={() => setLastTab("favorites")}>
        즐겨찾기 <b>{favorites.length}</b>
      </TabsTrigger>

      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex items-center gap-1">
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
          <Button
            variant="outline"
            size="sm"
            className={cn(
              isMapView && "border-blue-300 bg-blue-100/50 text-blue-700",
            )}
            onClick={onToggleMap}
          >
            <Map />
            지도
          </Button>
        </div>
        <div className="text-muted-foreground text-xs tracking-tight">
          최근 조회 :{" "}
          {new Date(lastFetchedAt).toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-3">
        <Label>
          <Checkbox
            defaultChecked={config.isViewElectric}
            onClick={() =>
              setConfig({ ...config, isViewElectric: !config.isViewElectric })
            }
          />
          전기차 구역 제외
        </Label>
        <Label>
          <Checkbox
            defaultChecked={config.isViewHandicapped}
            onClick={() =>
              setConfig({ ...config, isViewHandicapped: !config.isViewHandicapped })
            }
          />
          장애인 구역 제외
        </Label>
      </div>
    </TabsList>
  );
}
