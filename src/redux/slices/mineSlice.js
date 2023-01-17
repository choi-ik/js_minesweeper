import { createSlice } from "@reduxjs/toolkit";

export const mineSetSlice = createSlice({
    name: "mineSetSlice",
    initialState: {
        mine: 10, //Default 마인 개수
        flagCnt: 10
    },
    reducers: {
        // 지뢰 개수 변경
        setMine: (state, action) => {
            state.mine = action.payload;
        },
        setFlagCnt: (state, action) => {
            state.flagCnt = action.payload;
        },
        setPlusMine: (state, action) => {
            if(state.flagCnt < state.mine) state.flagCnt++;
        },
        setMinusMine: (state, action) => {
            if(state.flagCnt > 0) state.flagCnt--;
        },
        
    }
});

export const {
    setMine,
    setFlagCnt,
    setPlusMine,
    setMinusMine
} = mineSetSlice.actions;