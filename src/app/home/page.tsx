"use client";

import Button from "@mui/material/Button/Button";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Input from "@mui/material/Input/Input";
import TextareaAutosize from "@mui/base/TextareaAutosize/TextareaAutosize";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { startCreationAttempt } from "@/utils/spotify";

interface UserInfo {
  id: string;
  display_name: string;
  images: Array<{ url: string }>;
}

interface Result {
  url: string;
  title: string;
}

export default function Main() {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [sentence, setSentence] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [results, setResults] = useState<Array<Result>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id, display_name, images } = userInfo;

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash);
    const token = hash.get("#access_token");
    if (token !== null) {
      setAccessToken(token);
    } else {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    if (accessToken === "") return;
    try {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          else redirect("/");
        })
        .then((data) => {
          setUserInfo(data);
        });
    } catch (err) {
      console.error(err);
      redirect("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (url !== "") {
      redirect("/success" + url);
    }
  }, [url]);

  return (
    <main className="flex flex-col items-center p-24">
      <div className="mb-8">
        <div className="w-full flex justify-center">
          {images?.[1]?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images?.[1]?.url}
              alt="Profile Photo"
              width={96}
              height={96}
              className="rounded-full"
            />
          )}
        </div>
        <div className="text-center text-2xl mb-2">SpotifySentences</div>
        <div>{id === undefined ? "" : `Logged in: ${display_name}`}</div>
      </div>
      {id === undefined ? (
        <CircularProgress color="inherit" />
      ) : (
        <form
          id="song-form"
          className="flex flex-col items-center w-6/12 mb-12"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            startCreationAttempt(accessToken, sentence, title, id)
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
              placeholder="Title"
              className="w-full bg-white px-2 py-1 rounded-xl mr-2"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            <Button
              disabled={!title || !sentence}
              className="w-6/12 !bg-green-400 hover:bg-green-500 disabled:opacity-50 !disabled:bg-green-400"
              variant="contained"
              size="medium"
              type="submit"
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      )}
      {results.length > 0 && (
        <>
          <div className="text-2xl">History</div>
          {results.map((result, i) => (
            <div key={i} className="flex flex-row items-center">
              <div className="text-center text-xl m">
                {result.title}:{" "}
                <a
                  href={result.url}
                  target="_blank"
                  className={`text-center ${
                    result.url === "No songs found"
                      ? "text-red-400"
                      : "text-green-400"
                  } mb-2`}
                >
                  {result.url}
                </a>
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
