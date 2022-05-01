import React from 'react';
import Menu from './Menu';
import Interface from './Interface';
import Controller from './Controller';
import AlarmInterface from './AlarmInterface';
import {useState} from "react";
import useInterval from './UseInterval';

const timeObject = {
    t: 0,
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
    {
        number: 4,
        content: "menu",
        backgroundColor: "#9999fb",
        mode: "Alarm",
    },
];

// max lenght is 6
const alarmList = [
    {
        id: 0,
        day: ' monday',
        timeSet : {
            t: 27000,
            sec: 0,
            min: 30,
            hour: 18,
            isPossible: false,
        }
    },
    {
        id: 1,
        day: 'wednesday',
        timeSet : {
            t: 27000,
            sec: 0,
            min: 30,
            hour: 20,
            isPossible: false,
        }
    },
    {
        id: 2,
        day: ' thursday',
        timeSet : {
            t: 27000,
            sec: 0,
            min: 20,
            hour: 10,
            isPossible: false,
        }
    },
    {
        id: 3,
        day: ' monday',
        timeSet : {
            t: 27000,
            sec: 0,
            min: 30,
            hour: 7,
            isPossible: false,
        }
    },
    {
        id: 4,
        day: ' monday',
        timeSet : {
            t: 27000,
            sec: 0,
            min: 30,
            hour: 7,
            isPossible: false,
        }
    },
    {
        id: 5,
        day: ' monday',
        timeSet : {
            t: 27000,
            sec: 0,
            min: 30,
            hour: 7,
            isPossible: false,
        }
    }
];

function Timer(){
    const [timeSelector, setTimeSelector] = useState(0);
    const [id, setId] = useState(0);
    const [mode, setMode] = useState(btnList[0].mode);
    const [style, setStyle] = useState({
        'backgroundColor': btnList[0].backgroundColor,
    });
    const [hide, setHide] = useState('none');
    const [time, setTime] = useState({...timeObject});
    const clock = {...timeObject};
    const alarm = {...timeObject};
    const [timer, setTimer] = useState({...timeObject});
    const [stopWatch, setStopWatch] = useState({...timeObject});

    const clockHandler = ()=>{
        const date = new Date();
        clock.sec = date.getSeconds();
        clock.min = date.getMinutes();
        clock.hour = date.getHours();
    }
    const beUnit60 = (tObj)=>{
        let [t, hour, min, sec] = [tObj.t, tObj.hour, tObj.min, tObj.sec];
        hour = parseInt(t / 3600);
        min = parseInt((t - hour*3600)/60);
        sec = t - hour*3600 - min*60;

        return {t: t, hour: hour, min: min, sec: sec, isPossible: tObj.isPossible};
    }


    const timerHandler = ()=>{
        if(timer.isPossible){
            timer.t -= 1;
            setTimer(beUnit60(timer));
        }
        
    };
    const stopWatchHandler = ()=>{
        if(stopWatch.isPossible){
            stopWatch.t += 1;
        }
        setStopWatch(beUnit60(stopWatch));
    };
    //App Listener
    useInterval(() => {
        let tempTime;
        
        timerHandler();
        stopWatchHandler();
        
        if(mode === 'Clock'){
            clockHandler();
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
            setMode(btnList[e.target.dataset.id].mode);
            setStyle({
                'backgroundColor' : btnList[e.target.dataset.id].backgroundColor,
            });
            
            if(e.target.dataset.id === '4'){
                setHide('block');
            } else {
                setHide('none');
            }
        } else if(mode==='Timer'){
            if(e.target.className === 'prev'){
                setTimeSelector((timeSelector+2)%3);
            } else if(e.target.className === 'next'){
                setTimeSelector((timeSelector+1)%3);
            } else if(e.target.className === 'reset'){
                setTimer({...timeObject, isPossible:false});
            } else if(e.target.className === 'set'){
                if(!timer.isPossible){
                    setTimer({
                        hour: timeSelector===0 ? timer.hour<23? timer.hour+1: timer.hour :timer.hour,
                        min: timeSelector===1 ? timer.min<59 ? timer.min+1: timer.min : timer.min,
                        sec: timeSelector===2 ? timer.sec<59 ? timer.sec+1: timer.sec : timer.sec,
                        isPossible: timer.isPossible,
                        t: timer.hour * 3600 + timer.min*60 + timer.sec,
                    });
                }
            } else if(e.target.className === 'start'){
                setTimer({
                    t: timer.t,
                    hour: timer.hour,
                    min: timer.min,
                    sec: timer.sec,
                    isPossible: true,
                });
            }
        } else if(mode === 'Alarm') {
            
        } else if(mode==='Stop Watch') {
            if(e.target.className === 'reset'){
                setStopWatch({
                    t:0,
                    hour: 0,
                    min: 0,
                    sec: 0,
                    isPossible:false
                });
            } else if(e.target.className === 'set'){
                if(stopWatch.isPossible){
                    setStopWatch({
                        t : stopWatch.hour*3600 + stopWatch.min*60 + stopWatch.sec,
                        hour: stopWatch.hour,
                        min: stopWatch.min,
                        sec: stopWatch.sec,
                        isPossible: false,
                    });
                }
            } else if(e.target.className === 'start'){
                if(!stopWatch.isPossible){
                    setStopWatch({
                        t:0,
                        hour: 0,
                        min: 0,
                        sec: 0,
                        isPossible:true
                    });
                }
            }
        }
    };

    return(
        <div className="mobile-app">
            <Menu btnList={btnList} style={style} clickEvent={clickHandler}/>
            <Interface mode={mode} style={style} time={time} clickEvent={clickHandler}/>
            <AlarmInterface alarmSet={alarmList} style={hide}/>

            <Controller clickEvent={clickHandler}/>
        </div>
    );
}


export default Timer;