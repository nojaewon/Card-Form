import React from 'react';

function Menu(props){

    const btnList = props.btnList;

    return(
        <div className="menu">
            <button className="btn" style={props.style} onClick={props.clickEvent}>
                <span className="material-icons" data-id="0">{btnList[0].content}</span>
            </button>
            <button className="btn" style={props.style} onClick={props.clickEvent}>
                <span className="material-icons" data-id="1">{btnList[1].content}</span>
            </button>
            <button className="btn" style={props.style} onClick={props.clickEvent}>
                <span className="material-icons" data-id="2">{btnList[2].content}</span>
            </button>
            <button className="btn" style={props.style} onClick={props.clickEvent}>
                <span className="material-icons" data-id="3">{btnList[3].content}</span>
            </button>
            <button className="btn" style={props.style} onClick={props.clickEvent}>
                <span className="material-icons" data-id="4">{btnList[4].content}</span>
            </button>
        </div>
    );
}

export default Menu;