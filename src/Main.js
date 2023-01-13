import React from "react";
import GameBoard from "./components/GameBoard";
import GameEx2 from "./components/GameEx2";
import MineCount from "./components/MineCount";
import StartBtn from "./components/StartBtn";
import Timer from "./components/Timer";

function Main() {

    return (
        <>
            <MineCount />
            <StartBtn />
            <Timer />
            <GameBoard />
        </>
        
    )
}

export default Main;