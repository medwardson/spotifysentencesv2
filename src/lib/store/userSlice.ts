import { SearchResult } from "@/types/spotify";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
    info: {
        id: undefined,
        displayName: undefined,
        accessToken: undefined,
    },
    recentResults: [],
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
            }>
        ) => {
            state.info.id = action.payload.id;
            state.info.accessToken = action.payload.accessToken;
            state.info.displayName = action.payload.displayName;
        },
        clearUserInfo: (state) => {
            state.info.id = undefined;
            state.info.displayName = undefined;
            state.info.accessToken = undefined;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.info.accessToken = action.payload;
        },
        addRecentResult: (
            state,
            action: PayloadAction<{ sr: SearchResult }>
        ) => {
            state.recentResults = [action.payload.sr, ...state.recentResults];
        },
    },
});

export const { setUserInfo, clearUserInfo, setAccessToken, addRecentResult } =
    userSlice.actions;
export default userSlice.reducer;
