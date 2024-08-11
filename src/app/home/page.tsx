"use client";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useRouter } from "next/navigation";
import SearchHistory from "@/components/search/searchHistory/SearchHistory";
import SearchForm from "@/components/search/SearchForm";
import GreenButton from "@/components/GreenButton";
import { useAppSelector } from "../../lib/hooks";
import withAuth from "@/components/useAuth";
import { useEffect } from "react";
import { useHeader } from "@/components/HeaderContext";

function Main() {
    const router = useRouter();
    const { setShowBackButton, setShowLogoutButton } = useHeader();

    useEffect(() => {
        setShowBackButton(false);
        setShowLogoutButton(true);
    }, []);

    const { recentResults } = useAppSelector((state) => state.user);
    const { id } = useAppSelector((state) => state.user.info);

    return (
        <>
            <main className="flex flex-col items-center p-4 text-gray-800 w-full overflow-scroll">
                <div>
                    <GreenButton
                        text="Search History"
                        onClick={() => router.push("/history")}
                    />
                </div>

                {id ? (
                    <>
                        <SearchForm />
                        <SearchHistory
                            title="Recent Results"
                            results={recentResults}
                        />
                    </>
                ) : (
                    <CircularProgress color="inherit" />
                )}
            </main>
        </>
    );
}

export default withAuth(Main);
