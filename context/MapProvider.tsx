"use client";

import { PropsWithChildren } from "react";
import { NavermapsProvider } from "react-naver-maps";

export default function MapProvider({ children }: PropsWithChildren) {
  return (
    <NavermapsProvider ncpKeyId={process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY!}>
      {children}
    </NavermapsProvider>
  );
}
