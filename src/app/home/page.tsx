"use client";

import styles from "@/app/home/page.module.scss";

import { Header } from "@/components/home/header/Header";
import { Options } from "@/components/search/options/Options";
import SearchHistory from "@/components/search/searchHistory/SearchHistory";
import withAuth from "@/components/useAuth";
import { useAppSelector } from "@/lib/hooks";

function Main() {
    const { recentResults } = useAppSelector((state) => state.user);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles["bottom-container"]}>
                <Options className="mx-10 my-4" />
                <SearchHistory title="History" results={recentResults} />
            </div>
        </div>
    );
}

export default withAuth(Main);
