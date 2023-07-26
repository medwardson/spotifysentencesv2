'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ENV = encodeURI("http://localhost:8000/");

export default function Home() {
  const router = useRouter()

  function login() {
    const client_id = "d814e2c0db1c41ec848479f3876900c4";
    const redirect_uri = encodeURI("http://localhost:8000/home");
    
    const url = 'https://accounts.spotify.com/authorize' 
                  + '?response_type=token'
                  + '&client_id=' + client_id
                  + '&scope=playlist-modify-public'
                  + '&redirect_uri=' + redirect_uri
                  + '&show_dialog=true'

    window.location.assign(url)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='mb-8'>
        <div className="text-center text-2xl mb-2">
          SpotifySentences
        </div>
        <div>
          Welcome to SpotifySentences, please login to continue.
        </div>
      </div>
      <button id="login" className="rounded-full bg-green-400 py-2 px-4" onClick={login}>
        Login with Spotify
      </button>
    </main>
  )

}