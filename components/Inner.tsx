import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function Inner({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("px-4", className)}>{children}</div>;
}
