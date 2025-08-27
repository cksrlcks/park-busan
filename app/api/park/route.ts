import { NextResponse } from "next/server";
import { ParkItem, sigunguNames } from "@/types";

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

    const result = sigunguNames.map((name) => ({
      sigunguName: name,
      parks: data
        .filter((park) => park.sigunguName === name)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ gradeInfoList, ...rest }) => rest),
    }));

    return NextResponse.json(
      {
        lastFetchedAt: new Date().toISOString(),
        data: result,
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
