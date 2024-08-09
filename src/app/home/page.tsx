"use client";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SearchHistory from "@/components/search-history";
import SearchForm from "@/components/search-form";
import Cookies from "js-cookie";
import GreenButton from "@/components/GreenButton";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { clearUserInfo } from "@/lib/store/userSlice";

export default function Main() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { id, displayName, accessToken } = useAppSelector(
        (state) => state.user.info
    );

    const deleteCookie = () => {
        Cookies.remove("access_token");
        dispatch(clearUserInfo());
        router.push("/");
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

            {id ? (
                <>
                    <div className="mt-4 text-white">
                        Logged in as {displayName}
                    </div>
                    <SearchForm />
                    <SearchHistory />
                </>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </main>
    );
}
