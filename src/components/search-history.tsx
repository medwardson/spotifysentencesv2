"use client";

import { redirect } from "next/navigation";
import noBgLogo from "../../public/no-bg-logo.svg";
import { SearchResult } from "@/types/spotify";

interface SearchHistoryProps {
  results: Array<SearchResult>;
}

export default function SearchHistory({ results }: SearchHistoryProps) {
  return (
    <div className="text-white">
      <div className="text-2xl text-center my-4 font-bold">
        Previous Results
      </div>
      {results.length > 0 ? (
        <>
          {results.map((result, i) => (
            <div key={i} className="flex flex-row items-center">
              <div className="text-center text-xl m">
                {result.title}:{" "}
                <a
                  href={result.url}
                  target="_blank"
                  className={`text-center ${
                    result.url === "No songs found"
                      ? "text-red-400"
                      : "text-green-400"
                  } mb-2`}
                >
                  {result.url}
                </a>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-md text-white text-center my-4">
          No previous searches, try one!
        </div>
      )}
    </div>
  );
}
