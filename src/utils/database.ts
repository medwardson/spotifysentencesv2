import { SearchResult } from "@/types/spotify";

export const addPlaylist = async (userId: string, sr: SearchResult) => {
    await fetch("/api/addPlaylist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            ...sr,
        }),
    });
};

export const sendData = async (id: string, username: string, time: Date) => {
    await fetchWithTimeout("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            username: username,
            time: time.toDateString(),
        }),
    });
};

export const getPlaylistHistory = async (userId: string) => {
    const response = await fetchWithTimeout("/api/playlistHistory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    return data.result as SearchResult[];
};

const fetchWithTimeout = async (
    url: string,
    options: RequestInit = {},
    timeout: number = 7500
) => {
    const controller = new AbortController();
    options.signal = controller.signal;

    try {
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, options);
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            console.error("Fetch request timed out");
        } else {
            console.error("Fetch request failed", error);
        }
        throw error;
    }
};
