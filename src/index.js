import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer/Timer'
// import CardApp from './cardApp/CardApp';
// import './cardApp/style.css'
// import './timer/style.scss';
import './memoNote/style.css'
import Memo from './memoNote/Memo'


ReactDOM.render(
  <React.StrictMode>
    <Memo />
  </React.StrictMode>,
  document.getElementById('app')
);