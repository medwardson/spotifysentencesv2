export const addPlaylist = async (userId: string, playlist: string) => {
    console.log("Trying");
    try {
        const response = await fetch("/api/addPlaylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                playlist,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("There was an error:", error);
    }
};

export const sendData = async (id: string, username: string, time: Date) => {
    try {
        console.log("HERE");
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                username: username,
                time: time.toDateString(),
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("There was an error:", error);
    }
};
