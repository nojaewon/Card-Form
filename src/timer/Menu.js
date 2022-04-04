import React from 'react';

function Menu(props){

    const renderButton = props.btnList.map((btn)=>{
        return(
            <button key={btn.number} className="btn" style={props.style} onClick={props.clickEvent}>
                <span className="material-icons" data-id={btn.number}>{btn.content}</span>
            </button>
        );
    });

    return(
        <div className="menu">
            {renderButton}
        </div>
    );
}

export default Menu;