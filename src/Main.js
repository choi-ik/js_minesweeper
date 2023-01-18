import React from "react";
import BFS from "./components/BFS";
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
                        mx-auto"> MineSweeper </h1>
            <MineCount />
            <GameBoard />
            <StartBtn />
            <BFS />
        </div>
        
    )
}

export default Main;