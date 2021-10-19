import React, {useState} from 'react'
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar'

export const Wcalendar =()=> {
    // const [ date, setDate ] = useState(new Date());
    const date = new Date(2021, 3, 1);
    const [ homeUpdateFlag, setHomeUpdateFlag ] = useState(false);

    console.log(date);

    return (
        <div className="container">
            <WeeklyCalendar
                date={date}
                isMain={true}
                // individualOrGroup={props.individualOrGroup}
                homeUpdateFlag={homeUpdateFlag}
                setHomeUpdateFlag={setHomeUpdateFlag}
            />
        </div>
    )
}