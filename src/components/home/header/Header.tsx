import { Profile } from "@/components/home/profile/Profile";
import { TextInput } from "@/components/inputs/TextInput";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSentence, setTitle } from "@/lib/store/querySlice";
import Image from "next/image";
import logo from "../../../../public/images/newLogo.svg";
import styles from "./Header.module.scss";

export const Header = () => {
    const dispatch = useAppDispatch();

    const { title, sentence } = useAppSelector((state) => state.query);

    return (
        <div className={styles.header}>
            <Image
                height={208}
                width={208}
                className={styles.logo}
                src={logo.src}
                alt="Logo"
            />
            <div className={styles.headerRight}>
                <div className={styles.titleBox}>
                    <h1>Spotify Sentences</h1>
                    <Profile />
                </div>

                <TextInput
                    placeholder="Playlist Title"
                    value={title}
                    onChange={(value) => dispatch(setTitle(value))}
                    className="mt-2"
                />

                <TextInput
                    placeholder="Sentence to convert..."
                    value={sentence}
                    onChange={(value) => dispatch(setSentence(value))}
                    className="mt-2"
                />
            </div>
        </div>
    );
};
