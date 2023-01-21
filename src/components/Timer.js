import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setTimer } from "../redux/slices/timerSlice";

/*
    타이머의 boolean 상태,
    타이머 시간값,
    ---------------------
    타이머 셋팅 dispatch
*/
function Timer({ getTimerState , getTimerSet, setTimer }) {

    useEffect(() => {
        if(getTimerState === false) return;
        if(getTimerState === true) {
            let time = setInterval(() => {
                getTimerSet += 1;
                setTimer(getTimerSet);
            }, 1000);
            return () => {
                clearInterval(time);
                setTimer(0);
            }
        }
    }, [getTimerState]);

    return (   
        <div class="flex">
            <div class="h-auto
                        flex
                        self-end"> 진행시간 : {getTimerSet} 초 </div>
        </div> 
            
    )
}
// startBtnSlice의 버튼 boolean 상태 가져옴.
function mapStateToProps(state, ownProps) {
    return {
        getTimerState: state.timerSet.state,
        getTimerSet: state.timerSet.timer
    }
}
// startBtnSlice에 reducer에 dispatch.
function mapDispatchToProps(dispatch, ownProps) {
    return {
        setTimer: (time) => dispatch(setTimer(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Timer);