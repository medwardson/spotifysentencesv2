"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { loginUrl } from "@/utils/spotify";
import logo from "../../public/images/newLogo.svg";

import styles from "@/app/page.module.scss";
import GreenButton from "@/components/buttons/GreenButton";
import ImageCarousel from "@/components/image-carousel/ImageCarousel";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const existingAccessToken = Cookies.get("access_token");

        if (existingAccessToken) router.push("/loading");
    }, []);

    function login() {
        window.location.assign(loginUrl);
    }

    const albums = [
        "https://i.scdn.co/image/ab67616d0000485150dba34377a595e35f81b0e4",
        "https://i.scdn.co/image/ab67616d00004851c820e86be3bcbc65e5b88ef0",
        "https://i.scdn.co/image/ab67616d000048512a038d3bf875d23e4aeaa84e",
        "https://i.scdn.co/image/ab67616d000048515c4d4ffaf355d85a7842f0d3",
        "https://i.scdn.co/image/ab67616d0000485150dba34377a595e35f81b0e4",
        "https://i.scdn.co/image/ab67616d00004851c820e86be3bcbc65e5b88ef0",
        "https://i.scdn.co/image/ab67616d000048512a038d3bf875d23e4aeaa84e",
        "https://i.scdn.co/image/ab67616d000048515c4d4ffaf355d85a7842f0d3",
        "https://i.scdn.co/image/ab67616d0000485150dba34377a595e35f81b0e4",
        "https://i.scdn.co/image/ab67616d00004851c820e86be3bcbc65e5b88ef0",
        "https://i.scdn.co/image/ab67616d000048512a038d3bf875d23e4aeaa84e",
        "https://i.scdn.co/image/ab67616d000048515c4d4ffaf355d85a7842f0d3",
    ];

    return (
        <div className="flex flex-col items-center text-white h-full">
            <div className="h-2/4 flex items-center">
                <img className="h-3/5" src={logo.src} alt="Logo" />
                <div className="ml-12">
                    <h1 className="text-5xl font-bold">Spotify Sentences</h1>
                    <p className="my-4">
                        A fun way to create playlists whose songs' titles match
                        the words in your sentence!
                    </p>
                    <GreenButton text="Login with Spotify" onClick={login} />
                </div>
            </div>
            <div className={styles["bottom-container"]}>
                <div className={styles["description"]}>
                    <div className="text-xl font-bold mb-2">
                        How does it work?
                    </div>
                    <p>
                        Login with Spotify to enter a sentence and a playlist
                        title, then SpotifySentences will create a playlist on
                        your account with songs whose titles match the words in
                        your sentence!
                    </p>
                </div>

                <ImageCarousel images={albums} />
            </div>
        </div>
    );
}
