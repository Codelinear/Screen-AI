import type { Metadata } from "next";
import { graphik } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Screen.AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${graphik.className} bg-[#F2F5F6]`}>{children}</body>
    </html>
  );
}
