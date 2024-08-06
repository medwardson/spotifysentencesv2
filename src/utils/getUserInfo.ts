export async function fetchSpotifyUserData(accessToken: string) {
    try {
        const res = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching Spotify user data:", error);
        throw error;
    }
}
