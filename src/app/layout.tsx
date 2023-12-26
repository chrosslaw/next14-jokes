import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./ui/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Humor Emporium",
  description: "Simple page that fetches new jokes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex flex-col h-full w-full place-items-center">
      <body className={``}>
        <Header />
        {children}
      </body>
    </html>
  );
}
