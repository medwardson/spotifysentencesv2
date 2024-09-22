"use client";

import { loginUrl } from "@/utils/spotify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import GreenButton from "./GreenButton";

export const LoginButton = () => {
    const router = useRouter();

    function login() {
        const existingAccessToken = Cookies.get("access_token");

        if (existingAccessToken) {
            router.push("/loading");
            return;
        }

        window.location.assign(loginUrl);
    }

    return <GreenButton text="Login with Spotify" onClick={login} />;
};
