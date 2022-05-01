import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer/Timer'
// import CardApp from './cardApp/CardApp';
// import './cardApp/style.css'
import './timer/style.scss';


ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById('app')
);