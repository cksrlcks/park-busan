import Link from "next/link";
import clsx from "clsx";
import { ChevronLeftIcon, RefreshCwIcon, Share2, Star } from "lucide-react";
import Spinner from "../Spinner";
import { Button } from "../ui/button";

type ParkHeaderProps = {
  title: string;
  isFavorite: boolean;
  onFavorite: () => void;
  onRefetch: () => void;
  onShare: () => void;
  isFetching: boolean;
};

export default function ParkHeader({
  title,
  isFavorite,
  onFavorite,
  onRefetch,
  onShare,
  isFetching,
}: ParkHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button type="button" variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={clsx(
            isFavorite && "border-amber-200 bg-amber-50 hover:bg-amber-100",
          )}
          onClick={onFavorite}
        >
          <Star className={isFavorite ? "text-amber-400" : ""} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onRefetch}
          disabled={isFetching}
        >
          {isFetching ? (
            <Spinner className="h-4 w-4 text-black" />
          ) : (
            <RefreshCwIcon />
          )}
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={onShare}>
          <Share2 />
        </Button>
      </div>
    </div>
  );
}
