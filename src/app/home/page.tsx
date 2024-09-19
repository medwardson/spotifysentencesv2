"use client";

import styles from "@/app/home/page.module.scss";
import logo from "../../../public/images/newLogo.svg";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../../lib/hooks";
import withAuth from "@/components/useAuth";
import { TextInput } from "@/components/inputs/TextInput";
import { useState } from "react";

function Main() {
    const router = useRouter();

    const { recentResults } = useAppSelector((state) => state.user);
    const { displayName, profilePictureUrl } = useAppSelector(
        (state) => state.user.info
    );

    const [playlistTitle, setPlaylistTitle] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img className={styles.logo} src={logo.src} alt="Logo" />
                <div className={styles.headerRight}>
                    <div className={styles.titleBox}>
                        <h1>Spotify Sentences</h1>
                        <div className={styles.userInfo}>
                            <span>Hi, {displayName}!</span>
                            <img
                                className={styles.pfp}
                                src={profilePictureUrl}
                            />
                        </div>
                    </div>

                    <TextInput
                        placeholder="Playlist Title"
                        value={playlistTitle}
                        onChange={setPlaylistTitle}
                        className="mt-2"
                    />

                    <TextInput
                        placeholder="Sentence to convert..."
                        value=""
                        onChange={() => {}}
                        className="mt-2"
                    />
                </div>
            </div>
            <div className={styles["bottom-container"]}></div>
        </div>
    );
}

export default withAuth(Main);
