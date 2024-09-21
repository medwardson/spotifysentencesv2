"use client";

import { loginUrl } from "@/utils/spotify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../public/images/newLogo.svg";

import styles from "@/app/page.module.scss";
import GreenButton from "@/components/buttons/GreenButton";
import ImageCarousel from "@/components/image-carousel/ImageCarousel";
import { fetchAlbums } from "@/utils/database";
import { CircularProgress } from "@mui/material";

export default function Home() {
    const router = useRouter();
    const [albums, setAlbums] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const existingAccessToken = Cookies.get("access_token");

        if (existingAccessToken) router.push("/loading");
    }, []);

    function login() {
        window.location.assign(loginUrl);
    }

    useEffect(() => {
        fetchAlbums().then((albums) => {
            setAlbums(albums);
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col items-center text-white h-full">
            <div className={styles.header}>
                <img className={styles.logo} src={logo.src} alt="Logo" />
                <div className={styles.titleBox}>
                    <h1 className={styles.title}>Spotify Sentences</h1>
                    <p className={styles.subtitle}>
                        A fun way to create playlists whose songs&apos; titles
                        match the words in your sentence!
                    </p>
                    <GreenButton text="Login with Spotify" onClick={login} />
                </div>
            </div>
            <div className={styles["bottom-container"]}>
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className={styles.description}>
                            <div className={styles.howItWorks}>
                                How does it work?
                            </div>
                            <p className={styles.explanation}>
                                Login with Spotify to enter a sentence and a
                                playlist title, then SpotifySentences will
                                create a playlist on your account with songs
                                whose titles match the words in your sentence!
                            </p>
                        </div>

                        <ImageCarousel images={albums} />
                    </>
                )}
            </div>
        </div>
    );
}
