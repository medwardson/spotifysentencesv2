import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import logo from "../../public/logo.svg";

import styles from "@/app/layout.module.scss";
import Header from "@/components/header";

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
      <head>
        <link rel="icon" href={logo.src} />
      </head>
      <body
        className={`${inter.className} ${styles.body} flex flex-col items-center`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
