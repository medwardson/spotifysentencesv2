import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firebaseAdmin";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const ref = db.collection("albums").doc("albums");
        const albums = await ref.get();

        res.status(200).json(albums.data());
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
