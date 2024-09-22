import { useState } from "react";
import logo from "../../../../public/images/newLogo.svg";
import styles from "./Header.module.scss";
import { TextInput } from "@/components/inputs/TextInput";
import { Profile } from "@/components/home/profile/Profile";

export const Header = () => {
    const [playlistTitle, setPlaylistTitle] = useState<string>("");
    const [sentence, setSentence] = useState<string>("");

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logo.src} alt="Logo" />
            <div className={styles.headerRight}>
                <div className={styles.titleBox}>
                    <h1>Spotify Sentences</h1>
                    <Profile />
                </div>

                <TextInput
                    placeholder="Playlist Title"
                    value={playlistTitle}
                    onChange={setPlaylistTitle}
                    className="mt-2"
                />

                <TextInput
                    placeholder="Sentence to convert..."
                    value={sentence}
                    onChange={setSentence}
                    className="mt-2"
                />
            </div>
        </div>
    );
};
