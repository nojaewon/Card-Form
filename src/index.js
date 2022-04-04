import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer/Timer'
import './timer/style.scss';


ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById('app')
);

