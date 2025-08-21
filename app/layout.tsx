import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "../context/QueryProvider";

export const metadata: Metadata = {
  title: "주차검색기",
  description: "부산공영주차장 주차장 검색기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className=" scrollbar-hide">
      <body className="antialiased">
        <QueryProvider>
          <div className="max-w-md mx-auto w-full py-10 px-4">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
