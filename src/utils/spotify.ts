import { SearchResult, TrackObject } from "@/types/spotify";

class SpotifyClient {
    private headers: HeadersInit;

    constructor(private accessToken: string, private userId: string) {
        this.headers = {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        };
    }

    private url(name: string) {
        return `https://api.spotify.com/v1/search?q=${name}&type=track&limit=50`;
    }

    async startCreationAttempt(
        sentence: string,
        title: string,
        longerTitles: boolean
    ): Promise<SearchResult> {
        const words = this.splitSentence(sentence);

        const songUris = await (async () => {
            if (longerTitles) {
                return this.getSongsLong(words, [], new Map());
            } else {
                return this.getSongsShort(words, new Map());
            }
        })();
        if (songUris?.length === 0 || !songUris) {
            return { status: "failure", title };
        }

        const { id, url } = await this.makePlaylist(title);
        await this.addSongs(id, songUris);

        return { status: "success", url, title };
    }

    private splitSentence(sentence: string) {
        return sentence
            .split(" ")
            .map((word) => word.replace(/[^A-Za-z0-9]/g, ""))
            .filter((word) => word.length > 0);
    }

    // Divide and Conquer
    private async getSongsShort(
        words: string[],
        memo: Map<string, false | [string, string]> = new Map()
    ): Promise<string[]> {
        if (words.length === 1) {
            const name = words[0].toLowerCase();

            const songData = await (async () => {
                if (memo.has(name)) {
                    return memo.get(name);
                }
                const data = await this.searchSong(this.url(name), name);
                memo.set(name, data);
                return data;
            })();

            if (!songData) {
                return [];
            }

            return [songData[1]];
        } else if (words.length >= 2) {
            // split into half
            const half = Math.floor(words.length / 2);
            const firstHalf = words.slice(0, half);
            const secondHalf = words.slice(half, words.length);
            const firstHalfPromise = this.getSongsShort(firstHalf, memo);
            const secondHalfPromise = this.getSongsShort(secondHalf, memo);

            // if the results of of length words, then return
            const firstHalfSongs = await firstHalfPromise;
            const secondHalfSongs = await secondHalfPromise;

            if (
                firstHalfSongs.length + secondHalfSongs.length ===
                words.length
            ) {
                return [...firstHalfSongs, ...secondHalfSongs];
            }
        }

        return this.getSongsLong(words, [], memo);
    }

    private async getSongsLong(
        words: string[],
        acc: string[],
        memo: Map<string, false | [string, string]> = new Map()
    ): Promise<string[]> {
        if (words.length === 0) {
            return acc;
        }

        for (let i = 0; i < words.length; i++) {
            const slice = words.length - i;
            const curName = words.slice(0, slice).join(" ").toLowerCase();

            // Memoization to prevent duplicate requests
            const songData = await (async () => {
                if (memo.has(curName)) {
                    return memo.get(curName);
                }
                const data = await this.searchSong(this.url(curName), curName);
                memo.set(curName, data);
                return data;
            })();

            if (!songData) {
                continue;
            } else {
                const returned = await this.getSongsLong(
                    words.slice(slice, words.length),
                    [...acc, songData[1]],
                    memo
                );
                if (returned.length !== 0) {
                    return returned;
                }
            }
        }

        return [];
    }

    private async searchSong(
        url: string,
        songName: string
    ): Promise<false | [string, string]> {
        return fetch(url, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const results = data.tracks;

                if (results.total === 0) {
                    return false;
                }

                const items: TrackObject[] = results.items;

                const match = items.find(
                    (item) => item.name.toLowerCase() === songName
                );

                if (match) {
                    return [match.name, match.uri];
                }

                // If there are more pages of results, search them, but only if it's
                // a shorter song title. Longer song title would be unlikely to be hidden
                if (results.next && songName.split(" ").length <= 2) {
                    return this.searchSong(results.next, songName);
                }

                return false;
            });
    }

    private async makePlaylist(title: string) {
        return fetch(
            `https://api.spotify.com/v1/users/${this.userId}/playlists`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: title,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return { id: data.id, url: data.external_urls.spotify };
            });
    }

    private async addSongs(playlistId: string, songUris: string[]) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: songUris,
            }),
        });
    }
}

export default SpotifyClient;
