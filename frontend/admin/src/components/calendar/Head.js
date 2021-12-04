import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {withCookies} from 'react-cookie'
const Head = (props) =>{

    const date = props.date;

    return (
        <div className="head">
            <p className="day">{props.day}</p>
            <p className="date"><span className={(new Date(new Date().toDateString()).getTime()===new Date(props.date.toDateString()).getTime() ? "today" : "")}>{props.date.getDate()}</span></p>
        </div>
    )
}

export default withCookies(Head);