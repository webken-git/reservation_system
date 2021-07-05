import React, {useState} from 'react'
import WeeklyCalendar from "../components/calendar/WeeklyCalendar";


export default function Calendar() {
    const [ date, setDate ] = useState(new Date());

    return (
        <div className="Calendar">
            <WeeklyCalendar date={date} />
        </div>
    )
}