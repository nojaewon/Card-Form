import {useState} from 'react';

function Controller(props){
    return (
        <div className="controller">
            <div className='button-container'>
                <button className='prev' onClick={props.clickEvent}>&lang;</button>
                <button className='next' onClick={props.clickEvent}>&rang;</button>

                <button className="set" onClick={props.clickEvent}>timeSet</button>
                <button className="start" onClick={props.clickEvent}>START</button>
            </div>
        </div>
    );
}

export default Controller;