import React, { useEffect, useState } from "react";

function EXX() {

    const board = [];

    function ex() {
        for(let i=0; i<9; i++){
            board.push([]);
            for(let j=0; j<9; j++){
                board[i][j] = {
                    value: "++",
                    isOpen: false
                }
            }
        }
       board[2][0].isOpen = true;
       console.log(board[2][0])
    }
    

    useEffect(() => {
        ex();
    }, []);

    return (
        <div>
            
        </div>
    ) 
}
export default EXX;