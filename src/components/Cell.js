import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setRow, setCol } from "../redux/slices/gameBoardSlice";
import { setBtnText } from "../redux/slices/startBtnSlice";
import styled from "styled-components";

/* props 순서대로 
    행, 
    열, 
    셀의 값, 
    열의 길이, 
    행의 길이, 
    지뢰값, 
    게임보드 배열, 
    지뢰 개수, 
    깃발,
    버튼의 boolean 상태,
    시작버튼의 텍스트를 바꿀 dispatch */

const Cell = ({ row, col, value, getCol, getRow, getMineValue, getBoard, getMineCnt, getFlag, getBtnState, dispatchBtnText }) => {
    const [cellText, setCellText] = useState(false); // 셀이 클릭되기 전 false 상태 true가 되면 셀이 열림
    const [cell, setCell] = useState(0); //셀이 클릭되었을 때, 보여질 번호 또는 지뢰 
    const [rightClick, setRightClick] = useState(false);
    const ROW = row; // 행을 받아온 변수
    const COL = col; // 열을 받아온 변수

    useEffect(() => {
        setCellText(false);
        if(getBtnState === false) setCellText(false); // 지뢰 개수가 변하면 클릭되었던 셀들을 false로 닫아준다
    }, [getMineCnt, getBtnState]);

    // 지뢰의 존재여부 판단
    function isExistMine(row, col) {
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
        if(getBoard[row][col] === 0 && getCellNumber(row, col) !== 0) {
            setCell(getCellNumber(row, col));
        }
    };

    // 셀 좌클릭했을때 이벤트
    const onClick = (e) => {
        if(getBtnState === true){
            setCellText(true);
            if(value === "*") {
                setCell(value);
                e.target.style.backgroundColor = "#bdc3c7";
                dispatchBtnText("실패하였습니다. 다시 시작 하시겠습니까?");
            }
            setNumber(ROW, COL);
        }else{
            setCell("");
            
        }
        
    };

    // 셀 우클릭했을때 깃발 이벤트(토글)
    const onContextMenu = (e) => {
        e.preventDefault();
        if(getBtnState === true){
            if(rightClick === true) {
                setRightClick(false);
                setCell(false);
            } else {
                setCellText(true);
                setCell(getFlag);
                setRightClick(true);
            }
            
        }
    }

    return (
        <button type="button" 
                onClick={(e) => onClick(e)}
                onContextMenu={(e) => onContextMenu(e)}
                class="py-6 px-6  
                bg-green-600 
                hover:bg-green-700 
                text-white
                border
                ">
        {cellText === true ? cell : ""}
        </button>
    );
};
function mapStateToProps(state) {
    return{
        getCol: state.gameBoardSet.col,
        getRow: state.gameBoardSet.row,
        getMineValue: state.gameBoardSet.mineValue,
        getBoard: state.gameBoardSet.boardArray,
        getMineCnt: state.mineSet.mine,
        getFlag: state.gameBoardSet.flag,
        getBtnState: state.startBtnSet.btnState
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatchsetRow: (ROW) => {
            dispatch(setRow(ROW))
        },
        dispatchsetCol: (COL) => {
            dispatch(setCol(COL))
        },
        dispatchBtnText: (text) => {
            dispatch(setBtnText(text))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cell);

// const Button = styled.button`
//     width: 40px;
//     height: 40px;
// `
