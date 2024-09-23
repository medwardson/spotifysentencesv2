import styles from "@/components/search/options/Options.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearQuery, setFetching, setMode } from "@/lib/store/querySlice";
import { addRecentResult } from "@/lib/store/userSlice";
import { SearchResult } from "@/types/spotify";
import SpotifyClient from "@/utils/spotify";
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
    className?: string;
}

export const Options: FC<OptionsProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const { sentence, title, mode, isFetching } = useAppSelector(
        (state) => state.query
    );
    const { id, accessToken } = useAppSelector((state) => state.user.info);

    // TODO: maybe we can use DI
    if (!accessToken || !id) return;

    const client = new SpotifyClient(accessToken, id);
    const disabled = sentence.length === 0 || title.length === 0 || isFetching;

    const submit = async () => {
        dispatch(setFetching(true));
        client
            .startCreationAttempt(sentence, title, mode)
            .then((sr: SearchResult) => {
                dispatch(addRecentResult({ sr }));
                dispatch(clearQuery());
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    return (
        <div className={combineClasses(className, styles.options)}>
            <IconButton
                disabled={disabled}
                onClick={submit}
                className={styles["icon-button"]}
            >
                <Search className={styles.search} />
            </IconButton>

            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, newMode) => {
                    if (newMode !== null) {
                        dispatch(setMode(newMode));
                    }
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
