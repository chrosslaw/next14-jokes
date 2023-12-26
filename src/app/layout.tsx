import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./ui/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jokes on Demand",
  description: "Simple page that fetches new jokes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex flex-col h-full w-full place-items-start">
      <body className="h-full w-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
