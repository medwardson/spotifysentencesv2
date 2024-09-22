"use client";

import { useEffect, useState } from "react";
import { getPlaylistHistory } from "@/utils/database";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CircularProgress } from "@mui/material";
import withAuth from "@/components/useAuth";
import SearchHistory from "@/components/search/searchHistory/SearchHistory";
import { setFullHistory } from "@/lib/store/userSlice";

function Main() {
    const dispatch = useAppDispatch();
    const { id } = useAppSelector((state) => state.user.info);
    const { fullHistory } = useAppSelector((state) => state.user);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const history = await getPlaylistHistory(id!);
                dispatch(setFullHistory(history));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                throw new Error("Connection Timed Out");
            }
        };

        if (fullHistory?.length === 0) {
            fetchPlaylists();
        } else {
            setLoading(false);
        }
    }, [dispatch, fullHistory?.length, id]);

    return (
        <>
            <main className="flex flex-col items-center p-4 text-white w-full overflow-scroll">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <SearchHistory title="History" results={fullHistory} />
                )}
            </main>
        </>
    );
}

export default withAuth(Main);
