import React, {useState} from 'react'
import DailyCalendar from '../../components/calendar/DailyCalendar'

export const Dcalendar =()=> {
    // const [ date, setDate ] = useState(new Date());
    const date = new Date(2021, 3, 1);
    const [ homeUpdateFlag, setHomeUpdateFlag ] = useState(false);

    // console.log(date);

    return (
        <div className="container">
            <DailyCalendar
                date={date}
                isMain={true}
                // individualOrGroup={props.individualOrGroup}
                homeUpdateFlag={homeUpdateFlag}
                setHomeUpdateFlag={setHomeUpdateFlag}
            />
        </div>
    )
}