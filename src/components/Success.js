import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setTimerState } from "../redux/slices/timerSlice";
import { setBtnText } from "../redux/slices/startBtnSlice";

function Success({ getOepnCount, getMineCnt, setTimerState, setBtnText }) {

    useEffect(() => {
        if(getOepnCount === 81 - getMineCnt) {
            setTimerState(false);
            setBtnText("축하합니다 성공입니다.");
        } 
    }, [getOepnCount]);

    return(
        <span class="flex
                    self-end
                    scale-150
                    mr-[7.5%]
                    ml-[4%]">
            {getOepnCount === 81 - getMineCnt ? "😁" : "😐"}
        </span>
    );
}

function mapStateToProps(state, props) {
    return {
        getOepnCount: state.gameBoardSet.openCellCount,
        getMineCnt: state.mineSet.mine,
    }
};

function mapDispatchToProps(dispatch, props) {
    return {
        setTimerState: (state) => dispatch(setTimerState(state)),
        setBtnText: (text) => dispatch(setBtnText(text))
    }
};


export default connect(mapStateToProps, mapDispatchToProps) (Success);