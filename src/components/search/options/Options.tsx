import styles from "@/components/search/options/Options.module.scss";
import { combineClasses } from "@/utils/styles";
import { QuestionMark, Search } from "@mui/icons-material";
import {
    IconButton,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from "@mui/material";
import { FC } from "react";

export enum Mode {
    SHORT = "short",
    LONG = "long",
}

interface OptionsProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
    className?: string;
    onSearch?: () => void;
}

export const Options: FC<OptionsProps> = ({
    mode,
    setMode,
    className,
    onSearch,
}) => {
    return (
        <div className={className}>
            <IconButton onClick={onSearch} className={styles["icon-button"]}>
                <Search className={styles.search} />
            </IconButton>

            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, newMode) => {
                    setMode(newMode);
                }}
                aria-label="mode selection"
                className={combineClasses(styles["toggle-group"], "ml-8 mr-4")}
            >
                <ToggleButton
                    size="small"
                    value={Mode.SHORT}
                    aria-label="short titles"
                    classes={{
                        selected: styles["selected"],
                    }}
                >
                    Short Titles
                </ToggleButton>
                <ToggleButton
                    size="small"
                    value={Mode.LONG}
                    aria-label="long titles"
                    classes={{
                        selected: styles["selected"],
                    }}
                >
                    Long Titles
                </ToggleButton>
                <div className={combineClasses(styles.info, "ml-6")}>
                    <Tooltip
                        enterTouchDelay={0}
                        title="Option to prefer shorter or longer song titles in the playlist. Long titles will take longer to run."
                    >
                        <QuestionMark className={styles.question} />
                    </Tooltip>
                </div>
            </ToggleButtonGroup>
        </div>
    );
};
