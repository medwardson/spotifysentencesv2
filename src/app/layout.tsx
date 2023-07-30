import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import styles from "@/app/layout.module.scss";
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Sentences",
  description: "Creating fun spotify playlists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${styles.body} flex flex-col items-center`}
      >
        <Header />
        <div className="h-full w-full">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
