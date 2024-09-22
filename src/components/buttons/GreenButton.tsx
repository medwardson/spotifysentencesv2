"use client";

import styles from "./GreenButton.module.scss";

interface GreenButtonProps {
    text: string;
    onClick: () => any;
}

export default function GreenButton({ text, onClick }: GreenButtonProps) {
    return (
        <button
            className={styles["green-button"]}
            type="submit"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
