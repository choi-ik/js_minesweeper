import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setNumbers, setClickState, setInsertRow, setInsertCol, setInsertBoard, setBoardisOpen } from "../redux/slices/gameBoardSlice";
import { setMinusMine, setPlusMine } from "../redux/slices/mineSlice";
import { setBtnText } from "../redux/slices/startBtnSlice";
import { setTimerState } from "../redux/slices/timerSlice";
import { getCellTextColor } from "../utils/cellTextColor";
/* props 순서대로 
    행, 
    열, 
    셀의 값,
    셀의 Open 여부,
    지뢰, 
    게임보드 배열, 
    지뢰 개수, 
    깃발,
    버튼의 boolean 상태,
    셀 클릭의 boolean 상태,
    열린 셀의 개수,
    ---------------------------------------------------------------
    시작버튼의 텍스트를 바꿀 dispatch,
    타이머의 boolean 상태를 바꿀 dispatch,
    셀 클릭의 boolean 상태 dispatch,
    마인 개수 증가 dispatch,
    마인 개수 감소 dispatch,
    셀 클릭시 주변 지뢰개수 + DFS 알고리즘으로 주변 셀 열람 dispatch
 */

const Cell = ({ row, col, value, isOpen, getMineValue, getBoard, getMineCnt, getFlag, getBtnState, getClickState, getOepnCount,
    setBtnText, setTimerState, setClickState, setPlusMine, setMinusMine, setNumbers, setBoardisOpen }) => {

    const [rightClick, setRightClick] = useState(false); // 우클릭 시 좌클릭을 막기 위한 state
    const [lClickState, setLClickState] = useState(); // 좌클릭 시 우클릭을 막기 위한 state
    const [isFlag, setIsFlag] = useState(false); // 깃발을 보여주기 위한 state
    const [bgColor, setBgColor] = useState(); // 백그라운드 컬러의 상태
    
    const ROW = row; // 행을 받아온 변수
    const COL = col; // 열을 받아온 변수
    

    useEffect(() => {
        // 버튼의 상태가 true가 되면 클릭state의 상태를 treu로 변경.
        if(getBtnState === true) setClickState(true);
        setRightClick(false);
        setBgColor(true);
        setLClickState(false);
        setIsFlag(false);
    }, [getMineCnt, getBtnState]);

    // 셀 좌클릭했을때 이벤트
    const onClick = (e) => {
        if(getBtnState === true && getClickState === true) {
            if(getBoard[ROW][COL].value !== getMineValue){
                setLClickState(true);
                setNumbers(ROW, COL);
            }
            // 클릭한 셀이 지뢰일때
            if(getBoard[ROW][COL].value === getMineValue) {
                setBoardisOpen(ROW, COL);
                setTimerState(false);
                setClickState(false);
                setBtnText("실패하였습니다. 다시 시작 하시겠습니까?");
                setBgColor(false);
            };
            // 게임이 완료되면 클릭 비활성화
        }else if(getOepnCount === 81 - getMineCnt) {
            setClickState(false);
        }
         else {
            return false;
        }
    };

    // 셀 우클릭했을때 깃발 이벤트(토글)
    const onContextMenu = (e) => {
        e.preventDefault();
        if(getBtnState === true && getClickState === true) {
            if(rightClick === true) {
                setRightClick(false);
                setPlusMine();
                setIsFlag(false);
            } else {
                setIsFlag(true);
                setRightClick(true);
                setMinusMine();
            }
        }
    };
 
    return (
        <button type="button" 
                onClick={isFlag ? false : (e) => onClick(e)}
                onContextMenu={lClickState ? (e) => {e.preventDefault()} : (e) => onContextMenu(e)}
                class={`py-1 px-1
                        h-[50px] w-[50px]
                        ${bgColor === true ? getBoard[ROW][COL].value === 0 ? "bg-indigo-300" : "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-800"}
                        ${getCellTextColor(getBoard[ROW][COL].value)}
                        border`}>
         {isOpen ? getBoard[ROW][COL].value === 0 ? "ㅤ" : getBoard[ROW][COL].value : isFlag ? getFlag : "ㅤ"}
         {getOepnCount === 81 - getMineCnt ? getBoard[ROW][COL].value === getMineValue ? getMineValue : false : false}
        </button>
    );
};
function mapStateToProps(state) {
    return{
        getMineValue: state.gameBoardSet.mineValue,
        getBoard: state.gameBoardSet.boardArray,
        getMineCnt: state.mineSet.mine,
        getFlag: state.gameBoardSet.flag,
        getBtnState: state.startBtnSet.btnState,
        getClickState: state.gameBoardSet.clickState,
        getOepnCount: state.gameBoardSet.openCellCount,
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        setBtnText: (text) => dispatch(setBtnText(text)),
        setTimerState: (state) => dispatch(setTimerState(state)),
        setClickState: (state) => dispatch(setClickState(state)),
        setPlusMine: () => dispatch(setPlusMine()),
        setMinusMine: () => dispatch(setMinusMine()),
        setNumbers: (row, col) => dispatch(setNumbers({row, col})),
        setBoardisOpen: (row, col) => dispatch(setBoardisOpen({row, col})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cell);
