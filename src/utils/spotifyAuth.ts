import Cookies from "js-cookie";

const generateRandomString = (length: number) => {
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);

const sha256 = async (plain?: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
};

export const login = async () => {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const scope = "playlist-modify-public";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
        response_type: "code",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + "/loading",
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
};

export const getAccessToken = async (code: string) => {
    const codeVerifier = window.localStorage.getItem("code_verifier");

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + "/loading",
            code_verifier: codeVerifier as string,
        }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();

    console.log({ response });

    if (response.access_token) {
        Cookies.set("access_token", response.access_token, {
            expires: response.expires_in / (60 * 60 * 24), // Convert seconds to days
            secure: true,
            sameSite: "Strict",
        });
    }

    return response.access_token;
};
