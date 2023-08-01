import { SearchResult } from "@/types/spotify";
import { startCreationAttempt } from "@/utils/spotify";
import {
  Button,
  CircularProgress,
  ToggleButton,
  Input,
  TextareaAutosize,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

import { InfoSharp } from "@mui/icons-material";

interface SearchFormProps {
  accessToken: string;
  sentence: string;
  title: string;
  userId: string;
  loading: boolean;
  results: Array<SearchResult>;
  setSentence: (sentence: string) => void;
  setTitle: (title: string) => void;
  setResults: (results: Array<SearchResult>) => void;
  setLoading: (loading: boolean) => void;
}

export default function SearchForm({
  accessToken,
  sentence,
  title,
  userId,
  loading,
  results,
  setSentence,
  setTitle,
  setResults,
  setLoading,
}: SearchFormProps) {
  const [longerTitles, setlongerTitles] = useState(false);

  return (
    <form
      id="song-form"
      className="flex flex-col items-center my-12 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        startCreationAttempt(accessToken, sentence, title, userId, longerTitles)
          .then((res) => {
            setResults([...results, res]);
            setLoading(false);
          })
          .catch((err) => {
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
        maxLength={100}
      />
      <Input
        value={title}
        disableUnderline
        placeholder="Playlist Title"
        className="w-full bg-white px-3 py-1 rounded-xl mx-1 text-sm"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <div className="flex w-full justify-between items-center my-1">
        <div className="w-1/2 flex items-center">
          <div className="flex items-center">
            <ToggleButtonGroup
              className="w-full"
              exclusive
              onChange={(_, updated) => setlongerTitles(updated)}
            >
              <ToggleButton
                value={false}
                selected={longerTitles}
                className="bg-green-700 hover:bg-green-500 text-white px-2 whitespace-nowrap"
                size="small"
                color="success"
              >
                Short Titles
              </ToggleButton>
              <ToggleButton
                selected={!longerTitles}
                value={true}
                color="success"
                className="bg-green-700 hover:bg-green-500 text-white px-2 whitespace-nowrap"
                size="small"
              >
                Long Titles
              </ToggleButton>
            </ToggleButtonGroup>
            <Tooltip title="Option to prefer shorter or longer song titles in the playlist. Long titles will take longer to run.">
              <InfoSharp className="text-gray-100 ml-2 text-md" />
            </Tooltip>
          </div>
        </div>
        <Button
          disabled={!title || !sentence || loading}
          className="!bg-green-700 hover:bg-green-500 disabled:opacity-50 my-3 py-2 w-1/4"
          variant="contained"
          size="medium"
          type="submit"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Submit"}
        </Button>
      </div>
    </form>
  );
}
