import React, { PropsWithChildren } from "react";

export default function ParkListTitle({ children }: PropsWithChildren) {
  return <h1 className="mb-3 text-center text-lg font-semibold">{children}</h1>;
}
