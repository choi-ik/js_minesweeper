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
        visited: [],
        openCellCount:0 // 오픈 한 셀의 개수
    },
    reducers: {
        // 게임 보드 2차원 배열로 setting
        setPlace: (state, action) => {
            state.boardArray = []; // 배 열 초기화
            state.openCellCount = 0; // 오픈된 셀 초기화
            if(state.boardArray.length < 9){
                for(let i=0; i<state.row; i++) {
                    state.boardArray.push([]);
                    for(let j=0; j<state.col; j++) {
                        state.boardArray[i][j] = {
                            value: "*",
                            isOpen: false,
                        }
                    }
                }
            }
        },
        // 게임 보드에 마인 세팅
        setRandomMine: (state, action) => {
            for(let i=action.payload; i>0; i--) {
                let ROW = Math.floor(Math.random() * state.row);
                let COL = Math.floor(Math.random() * state.col);

                if(state.boardArray[ROW][COL].value === state.mineValue) i++;
                if(state.boardArray[ROW][COL].value === "*") state.boardArray[ROW][COL].value = state.mineValue;
            }
        },
        setClickState: (state, action) => {
            state.clickState = action.payload;
        },
        setInsertBoard: (state, action) => {
            state.boardArray[state.setRow][state.setCol] = action.payload;
        },
        setBoardisOpen: (state, action) => {
            const {row, col} = action.payload;
            state.boardArray[row][col].isOpen = true;
        },
        setInsertRow: (state, action) => {
            state.setRow = action.payload;
        },
        setInsertCol: (state, action) => {
            state.setCol = action.payload;
        },
        setVisited: (state, action) => {
            state.visited = [];
                for(let i=0; i<state.row; i++){
                    state.visited.push([]);
                    for(let j=0; j<state.col; j++){
                        state.visited[i].push(false);
                    }
                }
            console.log(state.visited,"방문 배열");
        },
        setNumbers: (state, action) => {
            const {row, col} = action.payload;
            console.log(row, col);
            state.visited[row][col] = true;

            if(state.boardArray[row][col].value === "*" && getCellNumber(row, col) !== 0) {
                state.boardArray[row][col].value = getCellNumber(row, col);
                state.boardArray[row][col].isOpen = true;
                state.openCellCount++;
            };
            if(state.boardArray[row][col].value === "*" && getCellNumber(row, col) === 0) {
                state.boardArray[row][col].value = getCellNumber(row, col);
                state.boardArray[row][col].isOpen = true;
                state.openCellCount++;
                dfsCell(row ,col);
            };

            function isExistMine(row, col) {
                // ArrayIndexOutOfBoundsException 예방
                if(row < 0 || row >= state.row || col < 0 || col >= state.col) {
                   return false;
               }
               return state.boardArray[row][col].value === state.mineValue; // true를 반환
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

            function dfsCell(row ,col) {  
                
                // 주변 지뢰갯수를 변수에 저장
                const top = getCellNumber(row-1, col);
                const bottom = getCellNumber(row+1, col);
                const left = getCellNumber(row, col-1);
                const right = getCellNumber(row, col+1);
                
                console.log("top:",top,"bottom:",bottom,"left:",left,"right:",right);
                // 위쪽 셀 탐색
                if(0 <= row-1 && row-1 < 9 && 0 <= col && col < 9){
                    if(!state.visited[row-1][col]){
                        if(top === 0){
                            state.visited[row-1][col] = true;
                            state.boardArray[row-1][col].value = top;
                            state.boardArray[row-1][col].isOpen = true;
                            state.openCellCount++;
                            dfsCell(row-1, col);
                        }else{
                            state.visited[row-1][col] = true;
                            state.boardArray[row-1][col].value = top;
                            state.boardArray[row-1][col].isOpen = true;
                            state.openCellCount++;
                        }
                    }
                }
                // 아래쪽 셀 탐색
                if(0 <= row+1 && row+1 < 9 && 0 <= col && col < 9){
                    if(!state.visited[row+1][col]){
                        if(bottom === 0){
                            state.visited[row+1][col] = true;
                            state.boardArray[row+1][col].value = bottom;
                            state.boardArray[row+1][col].isOpen = true;
                            state.openCellCount++;
                            dfsCell(row+1, col);
                        }else{
                            state.visited[row+1][col] = true;
                            state.boardArray[row+1][col].value = bottom;
                            state.boardArray[row+1][col].isOpen = true;
                            state.openCellCount++;
                        }
                    }
                }
                // 왼쪽 셀 탐색
                if(0 <= row && row < 9 && 0 <= col-1 && col-1 < 9){
                    if(!state.visited[row][col-1]){
                        if(left === 0){
                            state.visited[row][col-1] = true;
                            state.boardArray[row][col-1].value = left;
                            state.boardArray[row][col-1].isOpen = true;
                            state.openCellCount++;
                            dfsCell(row, col-1);
                        }else{
                            state.visited[row][col-1] = true;
                            state.boardArray[row][col-1].value = left;
                            state.boardArray[row][col-1].isOpen = true;
                            state.openCellCount++;
                        }
                    }
                }
                // 오른쪽 셀 탐색
                if(0 <= row && row < 9 && 0 <= col+1 && col+1 < 9){
                    if(!state.visited[row][col+1]){
                        if(right === 0){
                            state.visited[row][col+1] = true;
                            state.boardArray[row][col+1].value = right;
                            state.boardArray[row][col+1].isOpen = true;
                            state.openCellCount++;
                            dfsCell(row, col+1);
                        }else{
                            state.visited[row][col+1] = true;
                            state.boardArray[row][col+1].value = right;
                            state.boardArray[row][col+1].isOpen = true;
                            state.openCellCount++;
                        }
                        
                    }
                }
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
    setBoardisOpen,
    setInsertRow,
    setInsertCol,
    setVisited,
    setNumbers,
} = gameBoardSlice.actions;