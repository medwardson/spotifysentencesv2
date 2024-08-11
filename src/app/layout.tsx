"use client";

import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import styles from "@/app/layout.module.scss";
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react";
import StoreProvider from "./StoreProvider";
import { HeaderProvider, useHeader } from "@/components/HeaderContext";

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
                    <HeaderProvider>
                        <HeaderWrapper />
                        {children}
                    </HeaderProvider>
                </StoreProvider>
                <Analytics />
            </body>
        </html>
    );
}

function HeaderWrapper() {
    const { showBackButton, showLogoutButton } = useHeader();
    return <Header back={showBackButton} logout={showLogoutButton} />;
}
