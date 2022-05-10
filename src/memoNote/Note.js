import React from 'react';

function Note(props){
    const canvas = props.content.canvas;
    const ctx = props.content.context;

    return (
        <div className="note-container">
            <div className='layer'></div>
            <div className='canvas'></div>
        </div>
    )
}

export default Note;