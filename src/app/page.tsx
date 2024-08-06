"use client";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setAccessToken } from "../lib/store/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const existingAccessToken = Cookies.get("access_token");

        if (existingAccessToken) {
            dispatch(setAccessToken(existingAccessToken));

            router.push("/home");
        }
    }, []);

    function login() {
        const url =
            "https://accounts.spotify.com/authorize" +
            "?response_type=token" +
            "&client_id=" +
            process.env.NEXT_PUBLIC_CLIENT_ID +
            "&scope=playlist-modify-public" +
            "&redirect_uri=" +
            process.env.NEXT_PUBLIC_BASE_URL +
            "/loading" +
            "&show_dialog=true";

        window.location.assign(url);
    }

    return (
        <main>
            <div className="flex flex-col items-center text-gray-800 h-1/2 justify-center p-4">
                <button
                    id="login"
                    className="text-white rounded-full hover:transition-all bg-green-700 py-3 px-8 my-8 hover:bg-green-500"
                    onClick={login}
                >
                    Login with Spotify
                </button>
                <div>
                    <div className="text-2xl text-white text-center my-4 font-bold">
                        FAQ
                    </div>
                    <ul>
                        {[
                            {
                                q: "What is this?",
                                a: "SpotifySentences is a fun way to create playlists whose songs' titles match the words in your sentence.",
                            },
                            {
                                q: "How does it work?",
                                a: "After logging in with Spotify, you can enter a sentence and a playlist title. Then, SpotifySentences will create a playlist on your account with songs whose titles match the words in your sentence.",
                            },
                        ].map(({ q, a }) => (
                            <li key={q} className="text-white text-left my-4">
                                <div className="font-bold text-xl">{q}</div>
                                <div className="text-sm">{a}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
