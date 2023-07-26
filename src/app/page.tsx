"use client";

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
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-8">
        <div className="text-center text-2xl mb-2">SpotifySentences</div>
        <div>Welcome to SpotifySentences, please login to continue.</div>
      </div>
      <button
        id="login"
        className="rounded-full bg-green-400 py-2 px-4"
        onClick={login}
      >
        Login with Spotify
      </button>
    </main>
  );
}
