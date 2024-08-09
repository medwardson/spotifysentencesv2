import { SearchResult } from "@/types/spotify";

export const addPlaylist = async (userId: string, sr: SearchResult) => {
    try {
        const response = await fetch("/api/addPlaylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                ...sr,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("There was an error:", error);
    }
};

export const sendData = async (id: string, username: string, time: Date) => {
    try {
        const response = await fetch("/api/user", {
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

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("There was an error:", error);
    }
};

export const getPlaylistHistory = async (userId: string) => {
    try {
        const response = await fetch("/api/playlistHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch playlist history");
        }

        const data = await response.json();
        return data.result as SearchResult[];
    } catch (error) {
        console.error("Error fetching playlist history:", error);
        throw error;
    }
};
