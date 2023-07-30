import { SearchResult } from "@/types/spotify";
import { startCreationAttempt } from "@/utils/spotify";
import {
  Button,
  CircularProgress,
  Input,
  TextareaAutosize,
} from "@mui/material";

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
  return (
    <form
      id="song-form"
      className="flex flex-col items-center my-12 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        startCreationAttempt(accessToken, sentence, title, userId)
          .then((res) => {
            setResults([...results, { url: res, title }]);
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
      />
      <div className="flex justify-between w-full">
        <Input
          value={title}
          disableUnderline
          placeholder="Playlist Title"
          className="w-full bg-white px-3 py-1 rounded-xl mr-2 text-sm"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <Button
          disabled={!title || !sentence || loading}
          className="w-6/12 !bg-green-700 hover:bg-green-500 disabled:opacity-50"
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
