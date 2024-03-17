import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString(
            "ascii"
        )
    );
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://spotifysentences.firebaseio.com",
    });
}

const db = getFirestore();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, time } = req.body;

        try {
            const docRef = db.collection("users").doc(username);
            await docRef.set(
                {
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
