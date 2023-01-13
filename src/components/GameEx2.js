import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";

function GameEx2() {
    const ROW = 9;
    const COL = 9;
    const MINECNT = 10;
    const MINE = "*";
    
    let boardArray = [];

    const [boardArr, setBoardArr] = useState();

    // 게임보드 초기화
    function gamePlace(row, col) {
        for(let i = 0; i < row; i++) {
            boardArray.push([]);
            for(let j = 0; j < col; j++) {
                boardArray[i].push(0);
            }
        }
    };
    // 랜덤으로 지뢰 주입
    function setMine() {
        let mineCnt = MINECNT;

        for(let i = mineCnt; i > 0; i--){
            let row = Math.floor(Math.random() * ROW);
            let col = Math.floor(Math.random() * COL);
            //console.log(i,"번째 ", row, col, "행과 열");
            if(boardArray[row][col] === MINE) i++;
            if(boardArray[row][col] === 0) boardArray[row][col] = MINE;
        }
        setBoardArr(boardArray);
        //console.log(boardArray,"지뢰 확인");
        /* boardArray.map((block, i) => {
            console.log(block);
            block.map((_, j) => {
                const cell = boardArray[i][j];
                console.log(i + "," + j, "=", cell, "잘 찍히냐") 
            });
        }); */
    }

    function isExistMine(row, col) {
        if(row < 0 || row >= ROW || col < 0 || col >= COL) return false;

        return boardArray[row][col] === MINE; // true를 반환
    };
    // 해당 배열 기준 자기 자신을 제외한 8칸에서 지뢰를 찾은 후 카운팅.
    function getMineNumber(row, col) {
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

    function setNumber(row, col) {
        if(boardArray[row][col] === 0 && getMineNumber(row, col) !== 0) {
            boardArray[row][col] = " " + getMineNumber(row, col) + " ";
        }
    };

    /* function printBoard() {
        for(let i = 0; i < ROW; i++) {
            for(let j = 0; j < COL; j++) {
                setNumber(i, j);
                console.log(boardArray[i][j]);
            }
            console.log("\n");
        }
    }; */

    useEffect(() => {
        gamePlace(ROW, COL);
        setMine();
        console.log(boardArr);
        // boardArray.map(row => {
        //     console.log(row)
        //     row.map((col) => {
        //         console.log(col);
        //     })
        // });
    }, []);

    return (
            <div>
               <div>밑에 게임 보드</div>
                {
                    boardArr !== undefined && boardArr.length > 0 && (
                        boardArr.map((row, i) => {
                            return (
                                <div>
                                    {
                                        row.map((col, j) => {
                                            // return (
                                            //     <Cell row={i}
                                            //           col={j}
                                            //           value={boardArr[i][j]}/>
                                            // )
                                        })
                                    }
                                </div>
                            )
                        })
                    )
                }    
            </div>
    );
}

export default GameEx2;

const GameBoard = styled.div`
    
`