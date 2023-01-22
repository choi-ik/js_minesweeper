import { createSlice } from "@reduxjs/toolkit";

export const mineSetSlice = createSlice({
    name: "mineSetSlice",
    initialState: {
        mine: 10, // Default 마인 개수
    },
    reducers: {
        // 지뢰 개수 변경
        setMine: (state, action) => {
            state.mine = action.payload;
        },
    }
});

export const {
    setMine,
} = mineSetSlice.actions;