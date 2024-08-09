import { SearchResult } from "@/types/spotify";
import SpotifyClient from "@/utils/spotify";
import {
    CircularProgress,
    Input,
    TextareaAutosize,
    Tooltip,
} from "@mui/material";
import { useState } from "react";

import { InfoSharp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addRecentResult } from "@/lib/store/userSlice";

export default function SearchForm() {
    const dispatch = useAppDispatch();
    const { id, accessToken } = useAppSelector((state) => state.user.info);

    const [longerTitles, setlongerTitles] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [sentence, setSentence] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    // TODO: maybe we can use DI
    if (!accessToken || !id) return;
    const client = new SpotifyClient(accessToken, id);

    return (
        <form
            id="song-form"
            className="flex flex-col items-center my-12 w-full"
            onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                client
                    .startCreationAttempt(sentence, title, longerTitles)
                    .then((sr: SearchResult) => {
                        dispatch(addRecentResult({ sr }));
                        setLoading(false);
                    })
                    .catch((err: any) => {
                        console.error(err);
                        setLoading(false);
                    });
                setTitle("");
                setSentence("");
            }}
        >
            <TextareaAutosize
                className="mb-4 w-full text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 text-slate-900 focus-visible:outline-0"
                aria-label="Demo input"
                placeholder="Sentence to convert..."
                name="sentence"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                maxLength={250}
            />
            <Input
                value={title}
                disableUnderline
                placeholder="Playlist Title"
                className="w-full bg-white px-3 py-1 rounded-xl mx-1 !text-sm"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex w-full justify-center items-center my-1 flex-wrap">
                <div className="flex items-center">
                    <button
                        disabled={!longerTitles}
                        className="bg-green-700 rounded-md hover:bg-green-500 disabled:opacity-100 disabled:text-white text-green-900 opacity-50 my-3 px-4 py-2.5 whitespace-nowrap mr-2 text-sm"
                        type="submit"
                        onClick={() => setlongerTitles(false)}
                    >
                        SHORT TITLES
                    </button>
                    <button
                        disabled={longerTitles}
                        className="bg-green-700 rounded-md hover:bg-green-500 disabled:opacity-100 disabled:text-white text-green-900 opacity-50 my-3 px-4 py-2.5 whitespace-nowrap text-sm"
                        type="submit"
                        onClick={() => setlongerTitles(true)}
                    >
                        LONG TITLES
                    </button>
                    <Tooltip
                        enterTouchDelay={0}
                        title="Option to prefer shorter or longer song titles in the playlist. Long titles will take longer to run."
                    >
                        <InfoSharp className="text-gray-100 mx-2 text-md" />
                    </Tooltip>
                </div>
            </div>
            <button
                disabled={!title || !sentence || loading}
                className="bg-green-700 rounded-md hover:bg-green-500 disabled:opacity-50 text-white disabled:text-green-900 px-4 py-2.5 whitespace-nowrap text-sm w-1/2"
                type="submit"
            >
                {loading ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    "SUBMIT"
                )}
            </button>
        </form>
    );
}
