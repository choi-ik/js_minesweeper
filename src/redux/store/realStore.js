import { configureStore } from "@reduxjs/toolkit";
import { mineSetSlice } from "../slices/mineSlice";
import { startBtnSlice } from "../slices/startBtnSlice";
import { timerSlice } from "../slices/timerSlice";
import { gameBoardSlice } from "../slices/gameBoardSlice";

export const store = configureStore({
    reducer: {
        mineSet: mineSetSlice.reducer,
        startBtnSet: startBtnSlice.reducer,
        timerSet: timerSlice.reducer,
        gameBoardSet: gameBoardSlice.reducer,
    },
});