import { PropsWithChildren } from "react";
import Spinner from "./Spinner";

export default function Loading({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-40">
      <Spinner className="text-black" />
      <span className="text-muted-foreground text-sm">{children}</span>
    </div>
  );
}
