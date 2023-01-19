import { createSlice } from "@reduxjs/toolkit";

export const gameBoardSlice = createSlice({
    name: "gameBoardSlice",
    initialState: {
        row: 9, // 기본 가로 길이
        col: 9, // 기본 세로 길이
        mineValue: "💣", // 블록에 들어간 마인의 value
        boardArray: [], // 보드 배열의 초기화
        flag: "🚩", // 깃발 값
        notFlag: "ㅤ",
        clickState: false,
        setRow: 0,
        setCol: 0,
        isOpen: false,
    },
    reducers: {
        // 게임 보드 2차원 배열로 setting
        setPlace: (state, action) => {
            state.boardArray = []; // 배 열 초기화
            if(state.boardArray.length < 9){
                for(let i=0; i<state.row; i++) {
                    state.boardArray.push([]);
                    for(let j=0; j<state.col; j++) {
                        state.boardArray[i].push(-1);
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
                if(state.boardArray[ROW][COL] === -1) state.boardArray[ROW][COL] = state.mineValue;
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
        },
        setNumbers: (state, action) => {
            const {row, col} = action.payload;
            console.log(row, col);

            function dfsCell(row ,col) {
                //위쪽으로
                if(state.boardArray[row-1][col] === 0){
                    if(!getCellNumber(row-1, col)){
                        state.boardArray[row-1][col] = "*"
                        dfsCell(row-1, col);
                    } 
                }
                if(state.boardArray[row+1][col] === 0 || state.boardArray[row+1][col] === "*"){
                    if(!getCellNumber(row+1, col)){
                        state.boardArray[row+1][col] = "*"
                        dfsCell(row+1, col);
                    }
                }
            };

            function isExistMine(row, col) {
                // ArrayIndexOutOfBoundsException 예방
                if(row < 0 || row >= state.row || col < 0 || col >= state.col) {
                   return false;
               }
               return state.boardArray[row][col] === state.mineValue; // true를 반환
           };

            function getCellNumber(row, col) {
                let mineCnt = 0;

                if(isExistMine(row-1, col-1)) mineCnt++;
                if(isExistMine(row-1, col)) mineCnt++;
                if(isExistMine(row-1, col+1)) mineCnt++;
                if(isExistMine(row, col-1)) mineCnt++;
                if(isExistMine(row, col+1)) mineCnt++;
                if(isExistMine(row+1, col-1)) mineCnt++;
                if(isExistMine(row+1, col)) mineCnt++;
                if(isExistMine(row+1, col+1)) mineCnt++;

                return mineCnt;
            };

            if(state.boardArray[row][col] === -1 && getCellNumber(row, col) !== 0) {
                state.boardArray[row][col] = getCellNumber(row, col);
            };
            if(state.boardArray[row][col] === -1 && getCellNumber(row, col) === 0) {
                state.boardArray[row][col] = getCellNumber(row, col);
                console.log(state.boardArray[row][col]);
                dfsCell(row ,col);
            };
            // if(state.boardArray[row][col] === "ㅤ") {
            //     state.boardArray[row][col] = getCellNumber(row, col);
            // };
        },
        // bfsCell : (state, action) => {
        //     const dx = [0, 0, 1, 1, 1, -1, -1, -1];
        //     const dy = [1, -1, 0, 1, -1, 0, 1, -1];
            

        //     const {x, y} = action.payload;
        //     const heigth = state.boardArray.length;
        //     const width = state.boardArray[0].length;
        //     const queue = [{x, y}];
        //     const visited = new Set([JSON.stringify({ x, y })]);

        //     while(queue.length) {
        //         let {x, y} = queue.shift();
                
        //         state.boardArray[x][y]. // 오픈한 셀은 탐색하지 않기 위해.
        //     }
            
        // },
    },
});

export const {
    setPlace,
    setRandomMine,
    setClickState,
    setInsertBoard,
    setInsertRow,
    setInsertCol,
    setNumbers,
} = gameBoardSlice.actions;