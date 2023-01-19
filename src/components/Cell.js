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

const Cell = ({ row, col, value, getMineValue, getBoard, getMineCnt, getFlag, getBtnState, getClickState,
    dispatchBtnText, dispatchTimerState, dispatchClickState, dispatchSetPlusMine, dispatchSetMinusMine, setNumbers, setInsertBoard, setInsertRow, setInsertCol }) => {

    const [cellState, setCellState] = useState(); // 셀이 클릭되기 전 false 상태 true가 되면 셀의값이 보임
    const [rightClick, setRightClick] = useState(false); // 셀의 우클릭 상태
    const [lClickState, setLClickState] = useState();
    const [isFlag, setIsFlag] = useState(false);
    const [bgColor, setBgColor] = useState(); // 백그라운드 컬러의 상태
    
    const ROW = row; // 행을 받아온 변수
    const COL = col; // 열을 받아온 변수
    const visited = {};

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

    
    function dfsCell(row, col) {
        
        if(getBoard[row][col] === 0 || getBoard[row][col] === "*") {
            visited[`${row}`+`${col}`] = true;
            // 위쪽으로 진행
            if(getBoard[row][col+1] === -1 && !visited[`${row}`+`${col+1}`]) {
                setNumbers(row, col+1);
                if(getBoard[row][col+1] === 0){
                    setInsertRow(row);
                    setInsertCol(col+1);
                    setInsertBoard("*");
                    dfsCell(row, col+1);    
                }
            };
        }
        console.log(getBoard,"DFS 배열");
    }

    // 셀 좌클릭했을때 이벤트
    const onClick = (e) => {
        if(getBtnState === true && getClickState === true) {
            setCellState(true);
            setLClickState(true);
            setNumbers(ROW, COL);
            // visited[`${row}`+`${col}`] = true;
            // console.log(visited);
            if(getBoard[ROW][COL] === getMineValue) {
                dispatchTimerState(false);
                dispatchClickState(false);
                dispatchBtnText("실패하였습니다. 다시 시작 하시겠습니까?");
                setBgColor(false);
            };
            // if(getBoard[ROW][COL] === "ㅤ") {
            //     setNumbers(ROW, COL)
            // }
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

/*  일단 주석 처리.
    // 지뢰의 존재여부 판단
    function isExistMine(row, col) {
         // ArrayIndexOutOfBoundsException 예방
         if(row < 0 || row >= getRow || col < 0 || col >= getCol){
            return false;
        }
        return getBoard[row][col] === getMineValue; // true를 반환
    };

    // 클릭한 셀 주변에 존재하는 지뢰만큼 count 해줌
    function getCellNumber(row, col) {
        let mineCnt = 0;

        if(isExistMine(row-1, col-1)) mineCnt++;
        if(isExistMine(row-1, col)) mineCnt++;
        if(isExistMine(row-1, col+1)) mineCnt++;
        if(isExistMine(row, col-1)) mineCnt++;
        if(isExistMine(row, col+1)) mineCnt++;
        if(isExistMine(row+1, col-1)) mineCnt++;
        if(isExistMine(row+1, col)) mineCnt++;
        if(isExistMine(row+1, col+1)) mineCnt++;

        return mineCnt;
    };

    // 클릭한 셀의 행과 열의 vlaue를 인자로 넘겨받아 주변 지뢰 개수를 set해줌
    function setNumber(row, col) {
        if(getBoard[row][col] === -1 && getCellNumber(row, col) !== 0) {
            //setCellText(getCellNumber(row, col));
            dispatchInsertBoard(getCellNumber(row, col));
        }
        if(getBoard[row][col] === -1 && getCellNumber(row, col) === 0) {
            //setCellText(getCellNumber(row, col));
            dispatchInsertBoard(getCellNumber(row, col));
        }
        if(getBoard[row][col] === "ㅤ") dispatchInsertBoard(getCellNumber(row, col));
    };
 */