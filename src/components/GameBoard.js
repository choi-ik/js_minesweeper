import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setPlace, setRandomMine, setVisited } from "../redux/slices/gameBoardSlice";
import Cell from "./Cell";
/*props 순서대로
    게입 보드 배열,
    지뢰개수,
    버튼의 boolean 상태,
    게임 보드 배열 초기화
    ----------------------------
    배열에 지뢰 랜덤 배치 dispatch
    방문 배열 초기화 dispatch
*/
function GameBoard({ getBoard, getMineCnt, getBtnState, setPlace, setRandomMine, setVisited }) {
    console.log(getBoard);
    useEffect(() => {
        if(getBtnState === true) {
            setPlace();
            setRandomMine(getMineCnt);
            setVisited();
        }else{
            setPlace();
        }
    }, [getMineCnt, getBtnState]);

    return (
        <div class="block
                    w-[fit-content]
                    mx-auto">
            {
                getBoard !== undefined && getBoard.length > 0 && (
                    getBoard.map((row, i) => {
                        return (
                            <div>  
                                {
                                    row.map((col, j) => {
                                        return(
                                            <Cell row={i}
                                                  col={j}
                                                  value={getBoard[i][j].value}
                                                  isOpen={getBoard[i][j].isOpen}/>
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
        getBoard: state.gameBoardSet.boardArray,
        getMineCnt: state.mineSet.mine,
        getBtnState: state.startBtnSet.btnState,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setPlace: () => dispatch(setPlace()),
        setRandomMine: (mineCnt) => dispatch(setRandomMine(mineCnt)),
        setVisited: () => dispatch(setVisited()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (GameBoard);