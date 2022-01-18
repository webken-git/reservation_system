import React, { useEffect } from 'react';
import { withCookies } from 'react-cookie'

const Select = (props) =>{
    const type = props.type;
    const setCalendarType = props.setCalendarType;

    // console.log(type);
    // console.log(type != null);

    function jump(link) {
        setCalendarType(link);
    }

    useEffect(()=>{
        if (type != null) {
            const elements = document.getElementById(type);
            // console.log(elements)
            // const element = elements[0];
            // const classList = element.classList;
            elements.classList.add("add")
            // calendarType.classList.add("add");
        }
    });

    // if (type == 'day') {
    //     document.getElementByClassName("day").style.backgroundColor = "white";
    // } else if (type == 'week') {
    //     document.getElementByClassName("week").style.backgroundColor = "white";
    // } else if (type == 'month') {
    //     document.getElementByClassName("month").style.backgroundColor = "white";
    // }
    // if (type != null) {
    //     const elements = document.getElementById(type);
    //     console.log(elements)
    //     // const element = elements[0];
    //     // const classList = element.classList;
    //     // classList.add("add")
    //     // calendarType.classList.add("add");
    // }


    return (
        <div className="select">
            <button type="button" className="btn calendar-btn" id="day" onClick={() => jump("daily")}>日</button>
            <button type="button" className="btn calendar-btn" id="week" onClick={() => jump("weekly")}>週</button>
            <button type="button" className="btn calendar-btn" id="month" onClick={() => jump("monthly")}>月</button>
            {/* <div className="week" onClick="jump(weekly)">週</div>
            <div className="month" onClick="jump(monthly)">月</div> */}
        </div>
    )
}

export default withCookies(Select);
