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

export default function Main() {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [accessToken, setAccessToken] = useState<string>("");
    const [results, setResults] = useState<Array<SearchResult>>([]);
    const { id, display_name } = userInfo || {};

    useEffect(() => {
        const existingAccessToken = Cookies.get("access_token");

        if (existingAccessToken) {
            setAccessToken(existingAccessToken);
            return;
        }

        const hash = new URLSearchParams(window.location.hash);
        const token = hash.get("#access_token");

        if (!token) {
            router.push("/");
        } else {
            setAccessToken(token);
            Cookies.set("access_token", token, {
                expires: 1 / 24,
            });
            const urlWithoutHash = window.location.href.split("#")[0];
            window.history.pushState({}, document.title, urlWithoutHash);
        }
    }, []);

    useEffect(() => {
        if (accessToken === "") return;
        try {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((res) => {
                    if (res.ok) return res.json();
                    else router.push("/");
                })
                .then((data) => {
                    setUserInfo(data);
                    sendData(data.id, data.display_name, new Date());
                });
        } catch (err) {
            router.push("/");
        }
    }, [accessToken]);

    return (
        <main className="flex flex-col items-center p-4 text-gray-800 w-full">
            <div className="mt-4 text-white">
                {id === undefined ? "" : `Logged in as ${display_name}`}
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
