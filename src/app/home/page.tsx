"use client";

import styles from "@/app/home/page.module.scss";
import logo from "../../../public/images/newLogo.svg";

import { TextInput } from "@/components/inputs/TextInput";
import { Mode, Options } from "@/components/search/options/Options";
import withAuth from "@/components/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "../../lib/hooks";

function Main() {
    const router = useRouter();

    const [mode, setMode] = useState<Mode>(Mode.SHORT);

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
            <div className={styles["bottom-container"]}>
                <Options mode={mode} setMode={setMode} className="mx-10 my-4" />
            </div>
        </div>
    );
}

export default withAuth(Main);
