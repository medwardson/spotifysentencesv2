import { SearchResult } from "@/types/spotify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
            time: time.toISOString().slice(0, 10).replace(/-/g, ""),
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

export const fetchAlbums = async (): Promise<string[]> => {
    const response = await fetchWithTimeout("/api/fetchAlbums");
    const data = await response.json();

    return data.albums;
};

const fetchWithTimeout = async (
    path: string,
    options: RequestInit = {},
    timeout: number = 7500
) => {
    const controller = new AbortController();
    options.signal = controller.signal;

    try {
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(`${baseUrl}${path}`, options);
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
