"use client";

import { useEffect, useState } from "react";
import { getPlaylistHistory } from "@/utils/database";
import { useAppSelector } from "@/lib/hooks";
import { CircularProgress } from "@mui/material";
import { SearchResult } from "@/types/spotify";
import withAuth from "@/components/useAuth";
import SearchHistory from "@/components/search/searchHistory/SearchHistory";

function Main() {
    const { id } = useAppSelector((state) => state.user.info);

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const searchResults = await getPlaylistHistory(id!);
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

export default withAuth(Main);
