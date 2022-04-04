import React from 'react';

function Interface(props){
    return (
        <div className="interface-container">
            <div className="timer-interface" style={props.style}>
                <h1 className="time">
                    <span className='hour'>{props.time.hour}</span>
                    :<span className='minute'>{props.time.min}</span>
                    :<span className='second'>{props.time.sec}</span>
                </h1>
                <button className="reset" onClick={props.clickEvent}>reset</button>
                <h2 className="mode-title">{props.mode}</h2>
            </div>
        </div>
        
    );
}

export default Interface;