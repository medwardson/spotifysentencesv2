import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/firebaseAdmin";
import { SearchResult } from "@/types/spotify";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { userId } = req.body;
        const userRef = db.collection("users").doc(userId);

        try {
            const doc = await userRef.get();
            let searchHistory = [];

            if (doc.exists) {
                const userData = doc.data();
                searchHistory = userData?.searchHistory || [];
            }

            const result: SearchResult[] = searchHistory.map((item: any) => {
                return {
                    ...item,
                    status: "success",
                };
            });

            res.status(200).json({ result });
        } catch (error) {
            console.error("Error getting document:", error);
            res.status(500).json({ error: "Failed to get user data" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
