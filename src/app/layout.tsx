"use client";

import "./globals.css";

import { Inter } from "next/font/google";

import styles from "@/app/layout.module.scss";
import { Analytics } from "@vercel/analytics/react";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} ${styles.body} flex flex-col items-center`}
            >
                <StoreProvider>
                    <main className="h-full w-full">{children}</main>
                </StoreProvider>
                <Analytics />
            </body>
        </html>
    );
}
