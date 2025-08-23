import type { Metadata } from "next";
import QueryProvider from "../context/QueryProvider";
import "./globals.css";

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
    <html lang="ko" className="scrollbar-hide">
      <head></head>
      <body className="antialiased">
        <QueryProvider>
          <div className="mx-auto w-full max-w-md py-10">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
