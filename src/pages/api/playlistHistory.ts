import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/firebaseAdmin";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { userId } = req.body;
        const userRef = db.collection("users").doc(userId);

        try {
            const doc = await userRef.get();
            let playlists = [];

            if (doc.exists) {
                const userData = doc.data();
                playlists = userData?.playlists || [];
            }

            res.status(200).json({ playlists });
        } catch (error) {
            console.error("Error getting document:", error);
            res.status(500).json({ error: "Failed to get user data" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
