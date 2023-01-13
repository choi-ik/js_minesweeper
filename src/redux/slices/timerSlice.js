import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name: "timerSlice",
    initialState: {
        state: false, // 타이머의 상태
        timer: 0 // 타이머의 초기값
    },
    reducers: {
        // 타이머 시작.
        setTimer: (state, action) => {
            state.timer = action.payload;
        },
        // 타이머의 boolean 값 변경
        setTimerState: (state, action) => {
            state.state = action.payload;
        } 
    }
});

export const {
    setTimer,
    setTimerState
} = timerSlice.actions;