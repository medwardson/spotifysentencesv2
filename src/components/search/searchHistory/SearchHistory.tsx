"use client";

import { SearchResult } from "@/types/spotify";

import styles from "./SearchHistory.module.scss";
import React from "react";

interface SearchHistoryProps {
    title: string;
    results: SearchResult[];
}

export default function SearchHistory({ title, results }: SearchHistoryProps) {
    return (
        <div className="text-white">
            <div className="text-2xl text-center my-4 font-bold">{title}</div>

            <div className="">
                {results.length > 0 ? (
                    <div className={styles.grid}>
                        {results.map((result, i) => (
                            <React.Fragment key={i}>
                                <div className="text-left font-bold">
                                    {result.title}:
                                </div>
                                <div className={styles.playlistLink}>
                                    {result.status === "success" ? (
                                        <a
                                            href={result.url}
                                            target="_blank"
                                            className="text-left text-green-400 mb-2"
                                        >
                                            {result.url}
                                        </a>
                                    ) : (
                                        <p className="text-left text-red-400 mb-2">
                                            No song combination found
                                        </p>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div className="text-md text-white text-center my-4">
                        No recent searches, try one!
                    </div>
                )}
            </div>
        </div>
    );
}
