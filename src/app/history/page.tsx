"use client";

import { useEffect, useState } from "react";
import { getPlaylistHistory } from "@/utils/database";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../lib/hooks";
import { CircularProgress } from "@mui/material";
import { SearchResult } from "@/types/spotify";
import SearchHistory from "@/components/search-history";

export default function Main() {
    const { id } = useAppSelector((state) => state.user.info);

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            router.push("/loading");
            return;
        }

        const fetchPlaylists = async () => {
            try {
                const searchResults = await getPlaylistHistory(id);
                setSearchResults(searchResults);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                throw new Error("Connection Timed Out");
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <main className="flex flex-col items-center p-4 text-white w-full">
            {loading ? (
                <CircularProgress />
            ) : (
                <SearchHistory title="History" results={searchResults} />
            )}
        </main>
    );
}
