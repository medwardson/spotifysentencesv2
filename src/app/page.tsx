"use client";

import Header from "@/components/header";

export default function Home() {
  function login() {
    const url =
      "https://accounts.spotify.com/authorize" +
      "?response_type=token" +
      "&client_id=" +
      process.env.NEXT_PUBLIC_CLIENT_ID +
      "&scope=playlist-modify-public" +
      "&redirect_uri=" +
      process.env.NEXT_PUBLIC_BASE_URL +
      "/home" +
      "&show_dialog=true";

    window.location.assign(url);
  }

  return (
    <main className="flex flex-col items-center text-gray-800 p-4">
      <button
        id="login"
        className="rounded-full bg-green-400 py-2 px-4 mb-8"
        onClick={login}
      >
        Login with Spotify
      </button>
      <div className="">
        <div className="text-2xl text-white text-center my-4 font-bold">
          FAQ
        </div>
        <ul>
          {[
            {
              q: "What is this?",
              a: "SpotifySentences is a fun way to create playlists whose songs' titles match the words in your sentence.",
            },
            {
              q: "How does it work?",
              a: "After logging in with Spotify, you can enter a sentence and a playlist title. Then, SpotifySentences will create a playlist on your account with songs whose titles match the words in your sentence.",
            },
          ].map(({ q, a }) => (
            <li key={q} className="text-white text-left my-4">
              <div className="font-bold text-xl">{q}</div>
              <div className="text-sm">{a}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
