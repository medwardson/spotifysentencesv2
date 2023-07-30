"use client";

import { SearchResult } from "@/types/spotify";

import styles from "./search-history.module.scss";
import React from "react";
interface SearchHistoryProps {
  results: Array<SearchResult>;
}

export default function SearchHistory({ results }: SearchHistoryProps) {
  return (
    <div className="text-white w-full">
      <div className="text-2xl text-center my-4 font-bold">
        Previous Results
      </div>
      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((result, i) => (
            <React.Fragment key={i}>
              <div className="text-left font-bold">{result.title}:</div>
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
          No previous searches, try one!
        </div>
      )}
    </div>
  );
}
