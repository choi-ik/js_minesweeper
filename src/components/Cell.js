import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setNumbers, setClickState, setInsertRow, setInsertCol, setInsertBoard } from "../redux/slices/gameBoardSlice";
import { setMinusMine, setPlusMine } from "../redux/slices/mineSlice";
import { setBtnText } from "../redux/slices/startBtnSlice";
import { setTimerState } from "../redux/slices/timerSlice";
import { getCellTextColor } from "../utils/cellTextColor";
/* props 순서대로 
    행, 
    열, 
    셀의 값,
    보드의 가로 길이,
    보드의 세로 길이,
    지뢰값, 
    게임보드 배열, 
    지뢰 개수, 
    깃발,
    버튼의 boolean 상태,
    셀 클릭의 boolean 상태,
    시작버튼의 텍스트를 바꿀 dispatch,
    타이머의 boolean 상태를 바꿀 dispatch,
    셀 클릭의 boolean 상태 dispatch,
    행 / 열 / 행,열에 해당하는 보드의 값 dispatch,
    왼쪽 상단에 나타난 지뢰갯수가 깃발 개수만큼 증가 / 감소 dispatch */

const Cell = ({ row, col, value, getMineValue, getBoard, getMineCnt, getFlag, getBtnState, getClickState, getVisited,
    dispatchBtnText, dispatchTimerState, dispatchClickState, dispatchSetPlusMine, dispatchSetMinusMine, setNumbers, setInsertBoard, setInsertRow, setInsertCol }) => {

    const [cellState, setCellState] = useState(); // 셀이 클릭되기 전 false 상태 true가 되면 셀의값이 보임
    const [rightClick, setRightClick] = useState(false); // 셀의 우클릭 상태
    const [lClickState, setLClickState] = useState();
    const [isFlag, setIsFlag] = useState(false);
    const [bgColor, setBgColor] = useState(); // 백그라운드 컬러의 상태
    
    const ROW = row; // 행을 받아온 변수
    const COL = col; // 열을 받아온 변수
    

    useEffect(() => {
         // 지뢰 개수가 변하면 클릭되었던 셀들을 false로 닫아주고, 시적버튼의 상태에 따라 버튼의 상태도 변경.
        if(getBtnState === false) setCellState(false);
        // 버튼의 상태가 true가 되면 클릭state의 상태를 treu로 변경.
        if(getBtnState === true) dispatchClickState(true);
        setRightClick(false);
        setBgColor(true);
        setLClickState(false);
        setIsFlag(false);
        
    }, [getMineCnt, getBtnState]);

    // 셀 좌클릭했을때 이벤트
    const onClick = (e) => {
        if(getBtnState === true && getClickState === true) {
            setCellState(true);
            setLClickState(true);
            setNumbers(ROW, COL);
            if(getBoard[ROW][COL] === getMineValue) {
                dispatchTimerState(false);
                dispatchClickState(false);
                dispatchBtnText("실패하였습니다. 다시 시작 하시겠습니까?");
                setBgColor(false);
            };
        } else {
            return false;
        }
    };

    // 셀 우클릭했을때 깃발 이벤트(토글)
    const onContextMenu = (e) => {
        e.preventDefault();
        if(getBtnState === true && getClickState === true) {
            setCellState(true);
            if(rightClick === true) {
                setCellState(false);
                setRightClick(false);
                dispatchSetPlusMine();
                setIsFlag(false);
            } else {
                setIsFlag(true);
                setRightClick(true);
                dispatchSetMinusMine();
            }
        }
    };
 
    return (
        <button type="button" 
                onClick={isFlag ? false : (e) => onClick(e)}
                onContextMenu={lClickState ? (e) => {e.preventDefault()} : (e) => onContextMenu(e)}
                class={`py-1 px-1
                        h-[50px] w-[50px]
                        ${bgColor === true ? "bg-indigo-200 hover:bg-indigo-300" : "bg-gray-800"}
                        ${getCellTextColor(getBoard[ROW][COL])}
                        border`}>
        {cellState === true ? isFlag ? getFlag : getBoard[ROW][COL] : "ㅤ"}
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
        getVisited: state.gameBoardSet.visited,
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatchBtnText: (text) => dispatch(setBtnText(text)),
        dispatchTimerState: (state) => dispatch(setTimerState(state)),
        dispatchClickState: (state) => dispatch(setClickState(state)),
        dispatchSetPlusMine: () => dispatch(setPlusMine()),
        dispatchSetMinusMine: () => dispatch(setMinusMine()),
        setNumbers: (row, col) => dispatch(setNumbers({row, col})),
        setInsertBoard: (value) => dispatch(setInsertBoard(value)),
        setInsertRow: (value) => dispatch(setInsertRow(value)),
        setInsertCol: (value) => dispatch(setInsertCol(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cell);
