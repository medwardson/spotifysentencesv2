/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchResult, UserInfo } from "@/types/spotify";
import SearchHistory from "@/components/search-history";
import SearchForm from "@/components/search-form";
import Cookies from "js-cookie";

export default function Main() {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [sentence, setSentence] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");
    const [results, setResults] = useState<Array<SearchResult>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { id, display_name, images } = userInfo || {};

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
                });
        } catch (err) {
            router.push("/");
        }
    }, [accessToken]);

    return (
        <main className="flex flex-col items-center p-4 text-gray-800 w-full">
            <div className="my-2">
                {images?.[1]?.url && (
                    <div className="w-full flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={images?.[1]?.url}
                            alt="Profile Photo"
                            width={96}
                            height={96}
                            className="rounded-full border-2 border-white mb-1"
                        />
                    </div>
                )}
                <div className="text-white">
                    {id === undefined ? "" : display_name}
                </div>
            </div>
            {id === undefined ? (
                <CircularProgress color="inherit" />
            ) : (
                <>
                    <SearchForm
                        sentence={sentence}
                        title={title}
                        accessToken={accessToken}
                        userId={id}
                        loading={loading}
                        results={results}
                        setSentence={setSentence}
                        setTitle={setTitle}
                        setResults={setResults}
                        setLoading={setLoading}
                    />
                    <SearchHistory results={results} />
                </>
            )}
        </main>
    );
}
