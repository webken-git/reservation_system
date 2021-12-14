import React, {useState} from 'react'
import MonthlyCalendar from '../../components/calendar/MonthlyCalendar'

export const Mcalendar =()=> {
    // const [ date, setDate ] = useState(new Date());
    const date = new Date(2021, 3, 1);
    const [ homeUpdateFlag, setHomeUpdateFlag ] = useState(false);

    console.log(date);

    return (
        <div className="container">
            <MonthlyCalendar
                date={date}
                isMain={true}
                // individualOrGroup={props.individualOrGroup}
                homeUpdateFlag={homeUpdateFlag}
                setHomeUpdateFlag={setHomeUpdateFlag}
            />
        </div>
    )
}