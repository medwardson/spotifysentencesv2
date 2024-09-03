const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_CLIENT_SECRET;

const authOptions = {
    method: "POST",
    headers: {
        Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
        grant_type: "client_credentials",
    }),
};

class AlbumGetter {
    private token: string = "";

    public async getAlbums() {
        try {
            console.log("Token:", `Bearer ${this.token}`);
            const response = await fetch(
                "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks",
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();

                const largestImageUrls = data.items.map((item: any) => {
                    const largestImage = item.track.album.images.sort(
                        (a: any, b: any) => b.height - a.height
                    )[0];
                    return largestImage.url;
                });

                return largestImageUrls;
            } else {
                console.error(
                    "Failed to retrieve albums",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    }

    async getToken() {
        try {
            const response = await fetch(
                "https://accounts.spotify.com/api/token",
                authOptions
            );
            if (response.ok) {
                const data = await response.json();
                const token = data.access_token;
                this.token = token;
                console.log("Token:", token);
                return token;
            } else {
                console.error(
                    "Failed to retrieve token",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    }
}

export default AlbumGetter;
