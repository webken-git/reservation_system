import React, {useState} from 'react'
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar'

export const Calendar =()=> {
  const [ date, setDate ] = useState(new Date());

    return (
        <div className="container">
            <WeeklyCalendar date={date} />
        </div>
    )
}