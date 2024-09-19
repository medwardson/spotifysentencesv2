import { SearchResult } from "@/types/spotify";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
    info: {
        id: undefined,
        displayName: undefined,
        accessToken: undefined,
        profilePictureUrl: undefined,
    },
    recentResults: [],
    fullHistory: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (
            state,
            action: PayloadAction<{
                id: string;
                displayName: string;
                accessToken: string;
                profilePictureUrl?: string;
            }>
        ) => {
            state.info.id = action.payload.id;
            state.info.accessToken = action.payload.accessToken;
            state.info.displayName = action.payload.displayName;
            state.info.profilePictureUrl = action.payload.profilePictureUrl;
        },
        clearUserInfo: () => {
            return initialState;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.info.accessToken = action.payload;
        },
        addRecentResult: (
            state,
            action: PayloadAction<{ sr: SearchResult }>
        ) => {
            state.recentResults.unshift(action.payload.sr);

            if (state.fullHistory.length > 1)
                state.fullHistory.unshift(action.payload.sr);
        },
        setFullHistory: (state, action: PayloadAction<SearchResult[]>) => {
            state.fullHistory = action.payload;
        },
    },
});

export const {
    setUserInfo,
    clearUserInfo,
    setAccessToken,
    addRecentResult,
    setFullHistory,
} = userSlice.actions;

export default userSlice.reducer;
