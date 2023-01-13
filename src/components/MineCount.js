import React, { useState } from "react";
import { setMine } from "../redux/slices/mineSlice";
import { connect } from "react-redux";

/* props 순서대로 
지뢰 개수, 
지뢰 개수 set 하는 dispatch 함수 */

function MineCount({mineState, mineModify}) {
    const [text, setText] = useState(); // mine의 디폴트 개수

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        mineModify(text);
        setText("");
    }

    return (
        <span class="mt-5
                    ml-96
                    inline-block">
            <form onSubmit={onSubmit}
                    class="">
                {/* <input type="text" value={text} placeholder="지뢰 갯수 입력" onChange={onChange}/> */}
                <input type="text"
                        value={text}
                        placeholder="지뢰 갯수 입력" 
                        onChange={onChange} 
                        id="name-with-label" 
                        size="15"
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
            </form>    
            <span class="ml-2">지뢰 개수 : {mineState}</span>
        </span>
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