import React, { FC } from "react";

import styles from "./TextInput.module.scss";

interface TextInputProps {
    placeholder: string;
    onChange: (input: string) => void;
    value: string;
    className?: string;
}

export const TextInput: FC<TextInputProps> = ({
    placeholder,
    onChange,
    value,
    className,
}) => {
    return (
        <div className={`${className} ${styles["input-container"]}`}>
            <input
                type="text"
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={styles["gradient-input"]}
                value={value}
            />
        </div>
    );
};
