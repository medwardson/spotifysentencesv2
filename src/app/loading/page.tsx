"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { sendData } from "@/utils/database";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/store/userSlice";
import { fetchSpotifyUserData } from "@/utils/getUserInfo";
import { CircularProgress } from "@mui/material";

export default function Main() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { accessToken } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (accessToken) {
            router.push("/home");
            return;
        }

        const hash = new URLSearchParams(window.location.hash);
        const newToken = hash.get("#access_token");

        if (newToken) {
            Cookies.set("access_token", newToken, {
                expires: 1 / 24,
            });
            getUserInfo(newToken);
            return;
        }

        const existingAccessToken = Cookies.get("access_token");

        if (existingAccessToken) {
            getUserInfo(existingAccessToken);
            return;
        }

        router.push("/");
    }, []);

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

    return (
        <main className="flex flex-col items-center p-4 text-white w-full">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold mb-4">Loading...</h1>
                <CircularProgress />
            </div>
        </main>
    );
}
