import logo from "../../public/images/newLogo.svg";

import styles from "@/app/page.module.scss";
import { LoginButton } from "@/components/buttons/LoginButton";
import ImageCarousel from "@/components/image-carousel/ImageCarousel";
import { fetchAlbums } from "@/utils/database";
import Image from "next/image";

export default async function Home() {
    const albums = await fetchAlbums();

    return (
        <div className="flex flex-col items-center text-white h-full">
            <div className={styles.header}>
                <Image width={252} height={252} src={logo.src} alt="Logo" />
                <div className={styles.titleBox}>
                    <h1 className={styles.title}>Spotify Sentences</h1>
                    <p className={styles.subtitle}>
                        A fun way to create playlists whose songs&apos; titles
                        match the words in your sentence!
                    </p>
                    <LoginButton />
                </div>
            </div>
            <div className={styles["bottom-container"]}>
                <div className={styles.description}>
                    <div className={styles.howItWorks}>How does it work?</div>
                    <p className={styles.explanation}>
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
