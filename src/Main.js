import React from "react";
import EXX from "./components/EXX";
import GameBoard from "./components/GameBoard";
import MineCount from "./components/MineCount";
import StartBtn from "./components/StartBtn";
import Success from "./components/Success";

function Main() {

    return (
        <div>
            <h1 class="mt-2
                        text-5xl
                        w-[fit-content]
                        font-bold
                        mx-auto"> MineSweeper <Success /> </h1>
            <MineCount />
            <GameBoard />
            <StartBtn />
            <EXX />
        </div>
        
    )
}

export default Main;