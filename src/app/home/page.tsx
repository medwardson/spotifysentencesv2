"use client";

import styles from "@/app/home/page.module.scss";

import { Header } from "@/components/home/header/Header";
import { Mode, Options } from "@/components/search/options/Options";
import withAuth from "@/components/useAuth";
import { useState } from "react";

function Main() {
    const [mode, setMode] = useState<Mode>(Mode.SHORT);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles["bottom-container"]}>
                <Options mode={mode} setMode={setMode} className="mx-10 my-4" />
            </div>
        </div>
    );
}

export default withAuth(Main);
