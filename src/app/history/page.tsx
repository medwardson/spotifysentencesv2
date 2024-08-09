"use client";

import { useEffect, useState } from "react";
import { getPlaylistHistory } from "@/utils/database";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../lib/hooks";
import { CircularProgress } from "@mui/material";

export default function Main() {
    const { id } = useAppSelector((state) => state.user.info);

    const [playlists, setPlaylists] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            router.push("/loading");
            return;
        }

        const fetchPlaylists = async () => {
            try {
                const playlists = await getPlaylistHistory(id);
                setPlaylists(playlists);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
            setLoading(false);
        };

        fetchPlaylists();
    }, []);

    return (
        <main className="flex flex-col items-center p-4 text-white w-full">
            <h1>History</h1>

            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {playlists.length === 0 ? (
                        <p>No playlists found</p>
                    ) : (
                        <ul>
                            {playlists.map((playlist) => (
                                <li key={playlist}>
                                    <a
                                        href={`https://open.spotify.com/playlist/${playlist}`}
                                        target="_blank"
                                        className="text-left text-green-400 mb-2"
                                    >
                                        {playlist}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </main>
    );
}
