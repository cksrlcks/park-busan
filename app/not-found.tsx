import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function notFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 text-center">
      <h1>잘못된 경로로 접근했거나, 없는 데이터 입니다.</h1>
      <div>
        <Button type="button" asChild>
          <Link href="/">처음으로</Link>
        </Button>
      </div>
    </div>
  );
}
