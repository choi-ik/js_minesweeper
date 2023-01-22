import React, { useEffect, useRef, useState } from "react";
import { setMine } from "../redux/slices/mineSlice";
import { setFlagCnt } from "../redux/slices/gameBoardSlice";
import { connect } from "react-redux";
import Timer from "./Timer";
import Success from "./Success";

/* props 순서대로 
    지뢰 개수, 
    깃발 개수,
    시작버튼의 상태,
-------------------------
    마인개수 변경 dispatch
    깃발 개수 변경 dispatch 
*/

function MineCount({getMineCnt, getFlagCnt, getBtnState, setMine, setFlagCnt}) {
    const [text, setText] = useState(); // mine의 디폴트 개수
    const [textBoolean, setTextBoolean] = useState(true);
    const inputRef = useRef(null);

    // 시작버튼의 상태에 따라 입력란의 활성화 및 비활성화 함수
    const inputState = () => {
        if(getBtnState === false) {
            return inputRef.current.disabled = false;
        } else {
            return inputRef.current.disabled = true;
        }
        
    };
    
    //
    const onChange = (e) => {
        setText(e.target.value);
        const textValue = Number(e.target.value); // 숫자가 입력되면 숫자그대로, 아니면 NaN 
        console.log(textValue);
        setTextBoolean(Number.isNaN(textValue)); // true이면 NaN false이면 숫자
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(textBoolean === true){
            alert("30 이하의 숫자만 입력해 주십시요.");
        } else {
            if(text > 30){
                alert("30 이하의 숫자만 입력해 주십시요.");
            } else {
                setMine(text);
                setFlagCnt(text);
            }
        }
        setText("");
    };

    useEffect(() => {
        if(getBtnState === false) setFlagCnt(getMineCnt);
        inputState();
    },[getBtnState, textBoolean]);

    return (
        <span class="flex
                    mt-5
                    justify-center
                    mb-2">
            <form onSubmit={onSubmit}
                    class=""> 
                {/* <input type="text" value={text} placeholder="지뢰 갯수 입력" onChange={onChange}/> */}
                <input type="text"
                        value={text}
                        placeholder="지뢰 갯수 입력" 
                        onChange={onChange} 
                        id="name-with-label" 
                        size="15"
                        ref={inputRef}
                        class="rounded-lg 
                                border
                                border-gray-300
                                h-8
                                bg-white 
                                text-gray-700 
                                placeholder-gray-400 
                                focus:ring-black
                                text-center" 
                        name="email"/>
                <span class="text-center"> : {getFlagCnt}</span>
            </form>
            <Success />
            <Timer />
            
        </span>
    )  
}
// mineSlice의 mine 개수 값 가져옴.
function mapStateToProps(state, ownProps) {
    return {
        getMineCnt: state.mineSet.mine,
        getFlagCnt: state.gameBoardSet.flagCnt,
        getBtnState: state.startBtnSet.btnState,
    }
}
// mineSlice에 mine 개수 dispatch.
function mapDispatchToProps(dispatch, ownProps) {
    return {
        setMine: (text) => dispatch(setMine(text)),
        setFlagCnt: (value) => dispatch(setFlagCnt(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MineCount);