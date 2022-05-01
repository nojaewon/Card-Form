import React from 'react';

function AlarmInterface(props){
    const style = {
        display: props.style
    };
    const alarmList = props.alarmSet.map((alarm)=>{
        const amPm = alarm.timeSet.hour >= 12 ? 'PM': 'AM';
        return (
            <div key={alarm.id} className='alarm-container'>
                <span className='alarm-info'>
                    <span className='day'>{alarm.day}</span>
                    <span className='time'>
                        {alarm.timeSet.hour}:{alarm.timeSet.min}
                    </span>
                    {amPm}
                </span>
                <label className="alarm-onoff">
                    <input type="checkbox"></input>
                    <span className="slider round"></span>
                </label>
            </div>
        )
    });

    return (
        <div className='alarm-interface' style={style}>
            {alarmList}
        </div>
    );
}

export default AlarmInterface;