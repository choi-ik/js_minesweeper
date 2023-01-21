import React, { useEffect } from "react";
import { connect } from "react-redux";

function Success({ getOepnCount, getMineCnt }) {

    useEffect(() => {
        console.log(getOepnCount, " 오픈된 셀 개수")
    }, [getOepnCount])
    return(
        <div>
            {getOepnCount === 81 - getMineCnt ? "👍" : false}
        </div>
    );
}

function mapStateToProps(state, props) {
    return {
        getOepnCount: state.gameBoardSet.openCellCount,
        getMineCnt: state.mineSet.mine,
    }
};

function mapDispatchToProps(dispatch, props) {

};


export default connect(mapStateToProps) (Success);