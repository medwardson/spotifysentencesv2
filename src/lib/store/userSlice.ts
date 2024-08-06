import { UserInfo } from "@/types/spotify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserInfo = {
    id: "",
    displayName: "",
    accessToken: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                id: string;
                displayName: string;
                accessToken: string;
            }>
        ) => {
            state.id = action.payload.id;
            state.accessToken = action.payload.accessToken;
            state.displayName = action.payload.displayName;
        },
        clearUser: (state) => {
            state.id = "";
            state.displayName = "";
            state.accessToken = "";
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setUser, clearUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
