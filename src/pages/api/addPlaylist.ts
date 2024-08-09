import type { NextApiRequest, NextApiResponse } from "next";
import { admin, db } from "../../utils/firebaseAdmin";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { userId, url, title } = req.body;
        const userRef = db.collection("users").doc(userId);

        try {
            console.log("Adding");
            await userRef.update({
                searchHistory: admin.firestore.FieldValue.arrayUnion({
                    title,
                    url,
                }),
            });

            res.status(200).json({ message: "Playlist added successfully" });
        } catch (error: any) {
            if (error.code === "not-found") {
                await userRef.set({
                    searchHistory: [{ title, url }],
                });
                return res
                    .status(200)
                    .json({ message: "Playlist added and user created" });
            }
            console.error("Failed to add playlist:", error);
            res.status(500).json({ error: "Failed to add playlist" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
