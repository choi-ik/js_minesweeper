import React, { useState } from "react";
import { setMine } from "../redux/slices/mineSlice";
import { connect } from "react-redux";

/* props 순서대로 
지뢰 개수, 
지뢰 개수 set 하는 dispatch 함수 */

function MineCount({mineState, mineModify}) {
    const [text, setText] = useState(10); // mine의 디폴트 개수

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        mineModify(text);
        setText("");
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} placeholder="지뢰 갯수 입력" onChange={onChange}/>
            </form>
            <div>지뢰 개수 : {mineState}</div>
        </>
    )
}
// mineSlice의 mine 개수 값 가져옴.
function mapStateToProps(state, ownProps) {
    return {
        mineState: state.mineSet.mine
    }
}
// mineSlice에 mine 개수 dispatch.
function mapDispatchToProps(dispatch, ownProps) {
    return {
        mineModify: (text) => dispatch(setMine(text)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MineCount);