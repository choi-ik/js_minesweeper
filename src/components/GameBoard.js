import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setPlace, setRandomMine } from "../redux/slices/gameBoardSlice";
import Cell from "./Cell";
/*props 순서대로
    2차원 배열 게임보드,
    지뢰개수,
    버튼의 boolean 상태,
    배열 setting dispatch,
    배열에 랜덤으로 지뢰 심는 dispatch

*/
function GameBoard({ getboardArray, getMineCnt, btnState, dispatchSetPlace, dispatchSetRandomMine }) {
    console.log(getboardArray);
    useEffect(() => {
        if(btnState === true) {
            dispatchSetPlace();
            dispatchSetRandomMine(getMineCnt);
        }else{
            dispatchSetPlace();
        }
    }, [getMineCnt, btnState]);

    return (
        <div class="block
                    w-[fit-content]
                    mx-auto">
            {
                getboardArray !== undefined && getboardArray.length > 0 && (
                    getboardArray.map((row, i) => {
                        return (
                            <div>  
                                {
                                    row.map((col, j) => {
                                        return(
                                            <Cell row={i}
                                                  col={j}
                                                  value={getboardArray[i][j]}/>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        getboardArray: state.gameBoardSet.boardArray,
        getMineCnt: state.mineSet.mine,
        btnState: state.startBtnSet.btnState,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatchSetPlace: () => {
            dispatch(setPlace());
        },
        dispatchSetRandomMine: (mineCnt) => {
            dispatch(setRandomMine(mineCnt))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (GameBoard);