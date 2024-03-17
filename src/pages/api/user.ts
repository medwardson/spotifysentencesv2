import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/firebaseAdmin";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { id, username, time } = req.body;

        try {
            const docRef = db.collection("users").doc(id);
            await docRef.set(
                {
                    username: username,
                    time: time,
                },
                { merge: true }
            );

            res.status(200).json({ message: "Data updated successfully" });
        } catch (error) {
            console.error("Error updating the database:", error);
            res.status(500).json({ error: "Failed to update the database" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
