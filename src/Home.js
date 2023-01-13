import React, { useState } from "react";
import { connect } from "react-redux";
import GameBoard from "./components/GameBoard";
import MineCount from "./components/MineCount";
import { add } from "./store";
import ToDo from "./ToDo";

function Home({toDos, addToDo}) {
    const [text, setText] = useState("");

    function onChange(e) {
        setText(e.target.value);
    };

    function onSubmit(e) {
        e.preventDefault();
        setText("");
        addToDo(text);
    };

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>{toDos.map(toDo => (
                    <ToDo {...toDo}  key={toDo.id}/>
                ))}
            </ul>
            <GameBoard />
            <MineCount />
        </>
    )
}

// store로부터 state를 가져다 줌
function mapStateToProps(state, ownProps) {
    return {toDos: state};
}
//store로 dispatch요청
function mapDispatchToProps(dispatch, ownProps) {
    return {
        addToDo: (text) => dispatch(add(text))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);