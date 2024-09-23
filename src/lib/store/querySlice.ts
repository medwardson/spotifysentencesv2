import { Mode } from "@/components/search/options/Options";
import { Query } from "@/types/query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Query = {
    title: "",
    sentence: "",
    mode: Mode.SHORT,
    isFetching: false,
};

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setSentence: (state, action: PayloadAction<string>) => {
            state.sentence = action.payload;
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
        clearQuery: () => {
            return initialState;
        },
    },
});

export const { setTitle, setSentence, setMode, setFetching, clearQuery } =
    querySlice.actions;

export default querySlice.reducer;
