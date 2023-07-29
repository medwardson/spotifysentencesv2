"use client";

import { SearchResult } from "@/types/spotify";

import styles from "./search-history.module.scss";
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
            <>
              <div className="text-left font-bold">{result.title}:</div>
              <div className={styles.playlistLink}>
                <a
                  href={result.url}
                  target="_blank"
                  className={`text-left ${
                    result.url === "No songs found"
                      ? "text-red-400"
                      : "text-green-400"
                  } mb-2`}
                >
                  {result.url}
                </a>
              </div>
            </>
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
