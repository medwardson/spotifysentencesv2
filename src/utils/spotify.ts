export const startCreationAttempt = async (accessToken: string, sentence: string, title: string, userId: string) => {
  const words = splitSentence(sentence);
  const songUris = await getSongsV2(accessToken, words, []);
  if (songUris?.length === 0 || !songUris) {
    return "No songs found";
  }

  const { id, url } = await makePlaylist(accessToken, title, userId);
  await addSongs(id, songUris, accessToken);

  return url;
}

const splitSentence = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => word.replace(/[^A-Za-z]/g, ''))
    .filter((word) => word.length > 0);
}

const getSongsV2 = async (accessToken: string, words: string[], acc: string[]): Promise<string[]> => {
  if (words.length === 0) {
    return acc;
  }

  for (let i = 0; i < words.length; i++) {
    const curName = words.slice(0, i + 1).join(" ");
    const songData = await searchSong(accessToken, curName);

    if (songData === false) {
      continue;
    } else {
      const returned = await getSongsV2(accessToken, words.slice(i+1, words.length), [...acc, songData[1]])
      if (returned.length !== 0) {
        return returned;
      }
    }
  }

  return [];
}

const searchSong = async (accessToken: string, songname: string) => {
  const songIndex = await getSongIndex(songname, accessToken);
  if (songIndex === false) {
    return false;
  }
  return fetch(
    "https://api.spotify.com/v1/search" +
      `?q=${songname}` +
      "&type=track&limit=50",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return [
        data.tracks.items[songIndex].name,
        data.tracks.items[songIndex].uri,
      ];
    });
}

const getSongIndex = async (songname: string, token: string) => {
  let count = 0;
  return fetch(
    "https://api.spotify.com/v1/search" +
      `?q=${songname}` +
      "&type=track&limit=50",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((res) => res.json())
  .then((data) => {
    if (data.tracks.items.length == 0) {
      return false;
    }
    for (let i = 0; i < data.tracks.items.length; i++) {
      if (songname.toLowerCase() == data.tracks.items[i].name.toLowerCase()) {
        return count;
      }
      count++;
    }
    return false;
  });
}

const makePlaylist = async (accessToken: string, title: string, userId: string) => {
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
    return {id: data.id, url: data.external_urls.spotify};
  });
}

const addSongs = async (playlistId: string, songUris: string[], accessToken: string) => {
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
}