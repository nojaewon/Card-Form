import React from 'react';
import Menu from './Menu';
import Interface from './Interface';
import Controller from './Controller';
import {useState} from "react";
import useInterval from './UseInterval';

const timeObject = {
    sec: 0,
    min: 0,
    hour: 0,
    isPossible: false,
};

const btnList = [
    {
        number: 0,
        content: "alarm",
        backgroundColor: "#ffb457",
        mode: "Clock",
    },
    {
        number: 1,
        content: "timer",
        backgroundColor: "#ff96bd",
        mode: "Timer",
    },
    {
        number: 2,
        content: "alarm_on",
        backgroundColor: "#9999fb",
        mode: "Alarm",
    },
    {
        number: 3,
        content: "timelapse",
        backgroundColor: "#ffe797",
        mode: "Stop Watch",
    },
];

function Timer(){
    const [timeSelector, setTimeSelector] = useState(0);
    const [id, setId] = useState(0);
    const [mode, setMode] = useState(btnList[id].mode);
    const [style, setStyle] = useState({
        'backgroundColor': btnList[id].backgroundColor,
    });

    const [time, setTime] = useState({...timeObject});
    const clock = {...timeObject};
    const [timer, setTimer] = useState({...timeObject, isPossible: false});
    const alarm = {...timeObject};
    const stopWatch = {...timeObject};

    const clockHandler = ()=>{
        const date = new Date();
        clock.sec = date.getSeconds();
        clock.min = date.getMinutes();
        clock.hour = date.getHours();
    }

    const beUnit60 = (tObj)=>{
        let [hour, min, sec] = [tObj.hour, tObj.min, tObj.sec];
        if(60 === sec){
            sec = 0;
            min += 1;
        } else if(sec === -1) {
            sec = 59;
            min -= 1;
        }

        if(60 === min){
            min = 0;
            hour += 1;
        } else if( min === -1) {
            min = 59
            hour -= 1;
        }

        if(24 === hour){
            hour = 0;
        } else if(hour === -1){
            hour = 0;
            min = 59;
        }

        return {hour: hour, min: min, sec: sec, isPossible: tObj.isPossible};
    }

    const timerHandler = ()=>{
        if(!timer.isPossible){
            timer.sec -= 1;
            if(timer.sec === -1 && timer.min === 0 && timer.hour === 0){
                setTimer({
                    hour: 0,
                    min: 0,
                    sec: 0,
                    isPossible: !timer.isPossible})
                return;
            }
            setTimer(beUnit60(timer));
        }
        
    };


    //App Listener
    useInterval(() => {
        let tempTime;
        clockHandler();
        timerHandler();
        
        if(mode === 'Clock'){
            tempTime = {...clock};
        }else if(mode === 'Alarm'){
            tempTime = {...alarm};
        }else if(mode === 'Timer'){
            tempTime = {...timer, isPossible: timer.isPossible};
        }else if(mode === 'Stop Watch'){
            tempTime = {...stopWatch};

        }
        setTime(tempTime);
    }, 1000);

    const clickHandler = (e)=>{
        if(e.target.className === 'material-icons'){
            setId(e.target.dataset.id);
            setMode(btnList[id].mode);
            setStyle({
                'backgroundColor' : btnList[id].backgroundColor,
            });
        } else if(mode==='Timer'){
            if(e.target.className === 'prev'){
                setTimeSelector((timeSelector+2)%3);
            } else if(e.target.className === 'next'){
                setTimeSelector((timeSelector+1)%3);
            } else if(e.target.className === 'reset'){
                setTimer({...timeObject, isPossible:true});
            } else if(e.target.className === 'set'){
                if(timer.isPossible){
                    setTimer(beUnit60({
                        hour: timeSelector===0 ? timer.hour+1:timer.hour,
                        min: timeSelector===1 ? timer.min+1 : timer.min,
                        sec: timeSelector===2 ? timer.sec+1 : timer.sec,
                        isPossible: timer.isPossible,
                    }));
                }
            } else if(e.target.className === 'start'){
                setTimer({
                    hour: timer.hour,
                    min: timer.min,
                    sec: timer.sec,
                    isPossible: timer.false,
                });

            }
        }
    };

    return(
        <div className="mobile-app">
            <Menu btnList={btnList} style={style} clickEvent={clickHandler}/>
            <Interface mode={mode} style={style} time={time} clickEvent={clickHandler}/>
            <Controller clickEvent={clickHandler}/>
        </div>
    );
}




export default Timer;