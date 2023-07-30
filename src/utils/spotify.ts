import { TrackObject } from "@/types/spotify";

export const startCreationAttempt = async (
  accessToken: string,
  sentence: string,
  title: string,
  userId: string
) => {
  const words = splitSentence(sentence);
  const songUris = await getSongsV2(accessToken, words, []);
  if (songUris?.length === 0 || !songUris) {
    return "No songs found";
  }

  const { id, url } = await makePlaylist(accessToken, title, userId);
  await addSongs(id, songUris, accessToken);

  return url;
};

const splitSentence = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => word.replace(/[^A-Za-z0-9]/g, ""))
    .filter((word) => word.length > 0);
};

const getSongsV2 = async (
  accessToken: string,
  words: string[],
  acc: string[],
  memo: Map<string, false | [string, string]> = new Map()
): Promise<string[]> => {
  if (words.length === 0) {
    return acc;
  }

  for (let i = 0; i < words.length; i++) {
    const curName = words.slice(0, i + 1).join(" ");
    const url =
      "https://api.spotify.com/v1/search" +
      `?q=${curName}` +
      "&type=track&limit=50";

    // Memoization to prevent duplicate requests
    const songData = await (async () => {
      if (memo.has(curName)) {
        return memo.get(curName);
      }
      const data = await searchSong(url, accessToken, curName);
      memo.set(curName, data);
      return data;
    })();

    if (!songData) {
      continue;
    } else {
      const returned = await getSongsV2(
        accessToken,
        words.slice(i + 1, words.length),
        [...acc, songData[1]],
        memo
      );
      if (returned.length !== 0) {
        return returned;
      }
    }
  }

  return [];
};

const searchSong = async (
  url: string,
  accessToken: string,
  songName: string
): Promise<false | [string, string]> => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const results = data.tracks;
      const lowerName = songName.toLowerCase();

      if (results.total === 0) {
        return false;
      }

      const items: TrackObject[] = results.items;

      const match = items.find((item) => item.name.toLowerCase() === lowerName);

      if (match) {
        return [match.name, match.uri];
      }

      if (results.next) {
        return searchSong(results.next, accessToken, songName);
      }

      return false;
    });
};

const makePlaylist = async (
  accessToken: string,
  title: string,
  userId: string
) => {
  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return { id: data.id, url: data.external_urls.spotify };
    });
};

const addSongs = async (
  playlistId: string,
  songUris: string[],
  accessToken: string
) => {
  fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: songUris,
    }),
  });
};
