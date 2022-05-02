import React, { useState, useRef } from 'react';
import Menu from './Menu';
import Interface from './Interface';
import Controller from './Controller';
import AlarmInterface from './AlarmInterface';
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

const alarmList = [
    {
        id: 0,
        day: 0,
        timeSet : {
            t: 27000,
            sec: 0,
            min: 30,
            hour: 18,
            isPossible: false,
        },
    },
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
    const [alarm, setAlarm] = useState({...timeObject});
    const [timer, setTimer] = useState({...timeObject});
    const [stopWatch, setStopWatch] = useState({...timeObject});

    

    const alarmRefList = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const clockHandler = ()=>{
        const date = new Date();
        clock.sec = date.getSeconds();
        clock.min = date.getMinutes();
        clock.hour = date.getHours();
        alarmHander(date);
    }

    const alarmHander = (date)=>{
        alarmList.forEach((alarm)=>{
            if(alarmRefList[alarm.id].current.checked && alarm.day === date.getDay() 
            && alarm.timeSet.hour === date.getHours() && alarm.timeSet.min === date.getMinutes()){
                if(date.getSeconds()<10){
                    alert('timeout!');
                }   
            } 
        });
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

            console.log(timer.t);
            if(timer.t <= 0){
                timer.isPossible = false;
                setTimer(timeObject);
            }else {
                setTimer(beUnit60(timer));
            }
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
        
        clockHandler();
        timerHandler();
        stopWatchHandler();
        
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
            setMode(btnList[e.target.dataset.id].mode);
            setStyle({
                'backgroundColor' : btnList[e.target.dataset.id].backgroundColor,
            });
            setTimeSelector(0);
            
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
                    let hour = timeSelector===0 ? timer.hour<23? timer.hour+1: timer.hour :timer.hour;
                    let min = timeSelector===1 ? timer.min<59 ? timer.min+1: timer.min : timer.min;
                    let sec = timeSelector===2 ? timer.sec<59 ? timer.sec+1: timer.sec : timer.sec;

                    setTimer({
                        hour: hour,
                        min: min,
                        sec: sec,
                        isPossible: timer.isPossible,
                        t: hour*3600 + min*60 + sec
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
            if(e.target.className === 'prev'){
                setTimeSelector((timeSelector+2)%3);
            } else if(e.target.className === 'next'){
                setTimeSelector((timeSelector+1)%3);
            } else if(e.target.className === 'reset'){
                alarmList.pop()
            } else if(e.target.className === 'set'){
                if(!alarm.isPossible){
                    let hour = timeSelector===0 ? alarm.hour<23? alarm.hour+1: alarm.hour :alarm.hour;
                    let min = timeSelector===1 ? alarm.min<59 ? alarm.min+1: alarm.min : alarm.min;
                    let sec = timeSelector===2 ? alarm.sec<59 ? alarm.sec+1: alarm.sec : alarm.sec;

                    setAlarm({
                        hour: hour,
                        min: min,
                        sec: sec,
                        isPossible: alarm.isPossible,
                        t: hour*3600 + min*60 + sec
                    });
                }
            } else if(e.target.className === 'start'){
                const day = new Date().getDay();
                
                if(alarmList.length === 6){
                    alert('Cannot make anymore!');
                } else {
                    
                    alarmList.push({
                        id: alarmList.length,
                        day: day,
                        timeSet: alarm
                    });

                    setAlarm({
                        t: 0,
                        hour: 0,
                        min: 0,
                        sec: 0,
                        isPossible: false,
                    });
                }
            }
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
            <AlarmInterface alarmSet={alarmList} style={hide} refList = {alarmRefList}/>

            <Controller clickEvent={clickHandler}/>
        </div>
    );
}

window.onload = ()=>{
    const description = `Welcome to Timer Application
        - Clock: No function, just Clock.
        - Timer:
            <, > : move current timeSet
            timeSet : set up the time of current timeSet
            start : start the timer
            reset : reset the timer
        - Alarm : the same use as timer
        - Stop Watch : click to start the App
        - Back Log : manage the Alarm lists
        `


    alert(description);
}


export default Timer;