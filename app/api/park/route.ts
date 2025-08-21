import { NextResponse } from "next/server";
import { ParkItem } from "@/types";

export async function GET() {
  try {
    const response = await fetch(
      "https://bsparking.bisco.or.kr/api/parking/realtime/list",
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        error: "Failed to fetch data",
        status: response.status,
      });
    }

    const { data } = (await response.json()) as { data: ParkItem[] };

    const grouped = data.reduce<Record<string, ParkItem[]>>((acc, park) => {
      if (!acc[park.addr]) acc[park.addr] = [];
      acc[park.addr].push(park);
      return acc;
    }, {});

    return NextResponse.json(
      {
        lastFetchedAt: new Date().toISOString(),
        data: grouped,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}
