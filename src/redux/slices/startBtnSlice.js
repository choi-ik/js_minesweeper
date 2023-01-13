import { createSlice } from "@reduxjs/toolkit";

export const startBtnSlice = createSlice({
    name: "startBtn",
    initialState: {
        btnState: false, // 시작버튼의 상태
        btnText: "게임 시작", // 시작버튼의 텍스트 초기값  
    },
    reducers: {
        // 버튼의 boolean 상태 변경
        setBtnState: (state, action) => {
            state.btnState = action.payload;
        },
        // 버튼의 텍스트 상태 변경
        setBtnText: (state, action) => {
            state.btnText = action.payload;
        }
    }
});

export const {
    setBtnState,
    setBtnText
} = startBtnSlice.actions;