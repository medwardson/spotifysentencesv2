import type { NextApiRequest, NextApiResponse } from "next";
import AlbumGetter from "@/utils/albumGetter";
import { db } from "@/utils/firebaseAdmin";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const albumGetter = new AlbumGetter();
        await albumGetter.getToken();
        const albums = await albumGetter.getAlbums();

        db.collection("albums")
            .doc("albums")
            .set({
                albums: albums.slice(0, 20),
            });

        res.status(200).json({ albums });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
