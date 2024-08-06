/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchResult, UserInfo } from "@/types/spotify";
import SearchHistory from "@/components/search-history";
import SearchForm from "@/components/search-form";
import Cookies from "js-cookie";
import { sendData } from "@/utils/database";
import GreenButton from "@/components/GreenButton";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { setUser, clearUser } from "@/lib/store/userSlice";
import { fetchSpotifyUserData } from "@/utils/getUserInfo";

export default function Main() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { id, displayName, accessToken } = useAppSelector(
        (state) => state.user
    );

    const [results, setResults] = useState<Array<SearchResult>>([]);

    const deleteCookie = () => {
        Cookies.remove("access_token");
        dispatch(clearUser());
        router.push("/");
    };

    const getUserInfo = async (accessToken: string) => {
        const fetchData = async () => {
            try {
                const data = await fetchSpotifyUserData(accessToken);
                dispatch(
                    setUser({
                        id: data.id,
                        displayName: data.display_name,
                        accessToken: accessToken,
                    })
                );
                // Optional: Call sendData if needed
                sendData(data.id, data.display_name, new Date());
                router.push("/home");
            } catch (error) {
                router.push("/");
            }
        };
        fetchData();
    };

    useEffect(() => {
        if (accessToken) return;
        router.push("/loading");
    }, []);

    if (!accessToken) return null;

    return (
        <main className="flex flex-col items-center p-4 text-gray-800 w-full">
            <div>
                <GreenButton
                    text="Search History"
                    onClick={() => router.push("/history")}
                />
                <GreenButton text="Log Out" onClick={deleteCookie} />
            </div>
            <div className="mt-4 text-white">
                {id === "" ? "" : `Logged in as ${displayName}`}
            </div>

            {id === undefined ? (
                <CircularProgress color="inherit" />
            ) : (
                <>
                    <SearchForm
                        accessToken={accessToken}
                        userId={id}
                        results={results}
                        setResults={setResults}
                    />
                    <SearchHistory results={results} />
                </>
            )}
        </main>
    );
}
