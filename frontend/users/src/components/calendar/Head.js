import React from 'react'
// import axios from 'axios'
import {withCookies} from 'react-cookie'
const Head = (props) =>{

    const calendarType = props.calendarType;

    const dayOfWeek = props.date.getDay() ;
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];

    if (calendarType === 'weekly') {
        return (
            <div className="head">
                <p className="day">{props.day}</p>
                <p className="date"><span className={(new Date(new Date().toDateString()).getTime()===new Date(props.date.toDateString()).getTime() ? "today" : "")}>{props.date.getDate()}</span></p>
            </div>
        )
    } else if (calendarType === 'daily') {
        return (
            <div className="daily-head">
                <p className="day">{dayOfWeekStr}</p>
                <p className="date"><span className={(new Date(new Date().toDateString()).getTime()===new Date(props.date.toDateString()).getTime() ? "today" : "")}>{props.date.getDate()}</span></p>
            </div>
        )
    }
}

export default withCookies(Head);