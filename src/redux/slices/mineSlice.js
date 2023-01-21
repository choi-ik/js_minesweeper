import { createSlice } from "@reduxjs/toolkit";

export const mineSetSlice = createSlice({
    name: "mineSetSlice",
    initialState: {
        mine: 10, // Default 마인 개수
        flagCnt: 10 // 깃발 개수
    },
    reducers: {
        // 지뢰 개수 변경
        setMine: (state, action) => {
            state.mine = action.payload;
        },
        // 깃발의 개수
        setFlagCnt: (state, action) => {
            state.flagCnt = action.payload;
        },
        // 깃발 개수 감소
        setPlusMine: (state, action) => {
            if(state.flagCnt < state.mine) state.flagCnt++;
        },
        // 깃발 개수 증가
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