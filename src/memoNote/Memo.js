import React,{ useState } from 'react';
import Note from './Note';

const memoObject = {
        key: 0,
        text: '',
        canvas: null,
        context: null,
}

function Memo(){
    const [memoList, setMemoList] = useState([]);

    const addNote = (e)=>{
        const newMemo = {...memoObject};
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        newMemo.key = memoList.length;
        newMemo.canvas = canvas;
        newMemo.context = context;

        setMemoList([...memoList, newMemo]);
    }

    const RenderNoteList = memoList.map((memo)=>{
        return <Note key={memo.key} content={memo} />
    })

    return (
        <div className='memo-container'>
            <div className='header'>
                <h1 className='title'>Memo Note++</h1>
            </div>
            <div className='memo-list'>
                {RenderNoteList}
            </div>
            <button className='adder' onClick={addNote}>
                <span className="material-icons icon">add_circle</span>
            </button>
        </div>
    )
}

export default Memo;