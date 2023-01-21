import React from "react";
import { setBtnState, setBtnText } from "../redux/slices/startBtnSlice";
import { connect } from "react-redux";
import { setTimerState } from "../redux/slices/timerSlice";

/*  props 순서대로
    버튼의 boolean 상태,
    버튼의 텍스트,
    -------------------------------------------
    버튼 boolean상태와 타이머 상태 변경 dispatch,
    버튼 텍스트 값 변경 dispatch,
*/

function StartBtn({ getBtnState, getBtnText, btnStateModify, setBtnText}) {
    
    // 클릭이벤트 (토글)
    const onClick = () => {
        if(getBtnState === true) {
            btnStateModify(false);
            setBtnText("게임 시작");
        }else{
            btnStateModify(true);
            setBtnText("Reset");
        }
    };

    return (
        <>
            <button type="button" 
                    onClick={onClick}
                    class="py-4 px-20 
                            block
                            mx-auto
                            my-2
                         bg-gray-600
                         hover:bg-gray-700 
                         focus:ring-gray-500 
                         focus:ring-offset-gray-200 
                         text-white 
                           rounded-lg">
            {getBtnText}</button>

        </>
    )
}
// startBtnSlice의 버튼 boolean 상태, text 값 가져옴.
function mapStateToProps(state, ownProps) {
    return {
        getBtnState: state.startBtnSet.btnState,
        getBtnText: state.startBtnSet.btnText
    };
}
// startBtnSlice에 버튼 상태값과 텍스트 값 dispatch
function mapDispatchToProps(dispatch, ownProps) {
    return {
        btnStateModify: (state) => {
            dispatch(setBtnState(state))
            dispatch(setTimerState(state))
        },
        setBtnText: (text) => {
            dispatch(setBtnText(text));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (StartBtn);