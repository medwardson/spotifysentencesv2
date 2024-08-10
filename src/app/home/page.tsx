"use client";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useRouter } from "next/navigation";
import SearchHistory from "@/components/search/searchHistory/SearchHistory";
import SearchForm from "@/components/search/SearchForm";
import Cookies from "js-cookie";
import GreenButton from "@/components/GreenButton";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { clearUserInfo } from "@/lib/store/userSlice";
import withAuth from "@/components/useAuth";

function Main() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { recentResults } = useAppSelector((state) => state.user);
    const { id, displayName } = useAppSelector((state) => state.user.info);

    const deleteCookie = () => {
        Cookies.remove("access_token");
        dispatch(clearUserInfo());
        router.push("/");
    };

    return (
        <main className="flex flex-col items-center p-4 text-gray-800 w-full">
            <div>
                <GreenButton
                    text="Search History"
                    onClick={() => router.push("/history")}
                />
                <GreenButton text="Log Out" onClick={deleteCookie} />
            </div>

            {id ? (
                <>
                    <div className="mt-4 text-white">
                        Logged in as {displayName}
                    </div>
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
    );
}

export default withAuth(Main);
