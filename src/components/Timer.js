import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setTimer } from "../redux/slices/timerSlice";

function Timer({ timerState , timerSet, timerModify }) {

    useEffect(() => {
        if(timerState === false) return;
        if(timerState === true) {
            let time = setInterval(() => {
                timerSet += 1;
                timerModify(timerSet);
            }, 1000);
            return () => {
                clearInterval(time);
                timerModify(0);
            }
        }
    }, [timerState]);

    return (   
        <div class="flex">
            <div class="h-auto
                        flex
                        self-end"> 진행시간 : {timerSet} 초 </div>
        </div> 
            
    )
}
// startBtnSlice의 버튼 boolean 상태 가져옴.
function mapStateToProps(state, ownProps) {
    return {
        timerState: state.timerSet.state,
        timerSet: state.timerSet.timer
    }
}
// startBtnSlice에 reducer에 dispatch.
function mapDispatchToProps(dispatch, ownProps) {
    return {
        timerModify: (time) => dispatch(setTimer(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Timer);