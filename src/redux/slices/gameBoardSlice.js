import { createSlice } from "@reduxjs/toolkit";
import { setBtnState } from "./startBtnSlice";

export const gameBoardSlice = createSlice({
    name: "gameBoardSlice",
    initialState: {
        row: 9, // 기본 가로 길이
        col: 9, // 기본 세로 길이
        mineValue: "💣", // 블록에 들어간 마인의 value
        boardArray: [], // 보드 배열의 초기화
        flag: "⚑", // 깃발 값
        clickState: false,
        setRow: 0,
        setCol: 0,
    },
    reducers: {
        // 게임 보드 2차원 배열로 setting
        setPlace: (state, action) => {
            state.boardArray = []; // 배 열 초기화
            if(state.boardArray.length < 9){
                for(let i=0; i<state.row; i++) {
                    state.boardArray.push([]);
                    for(let j=0; j<state.col; j++) {
                        state.boardArray[i].push(0);
                    }
                }
            }
        },
        // 게임 보드에 마인 세팅
        setRandomMine: (state, action) => {
            console.log(action.payload,"지뢰 개수");
            for(let i=action.payload; i>0; i--) {
                let ROW = Math.floor(Math.random() * state.row);
                let COL = Math.floor(Math.random() * state.col);

                if(state.boardArray[ROW][COL] === state.mineValue) i++;
                if(state.boardArray[ROW][COL] === 0) state.boardArray[ROW][COL] = state.mineValue;
            }
        },
        setClickState: (state, action) => {
            state.clickState = action.payload;
        },
        setInsertBoard: (state, action) => {
            state.boardArray[state.setRow][state.setCol] = action.payload;
        },
        setInsertRow: (state, action) => {
            state.setRow = action.payload;
        },
        setInsertCol: (state, action) => {
            state.setCol = action.payload;
        }
    }
});

export const {
    setPlace,
    setRandomMine,
    setClickState,
    setInsertBoard,
    setInsertRow,
    setInsertCol
} = gameBoardSlice.actions;