import React from "react";
import GameBoard from "./components/GameBoard";
import MineCount from "./components/MineCount";
import StartBtn from "./components/StartBtn";

function Main() {

    return (
        <div>
            <h1 class="mt-2
                        text-5xl
                        w-[fit-content]
                        font-bold
                        mx-auto"> MineSweeper</h1>
            <MineCount />
            <GameBoard />
            <StartBtn />
        </div>
        
    )
}

export default Main;