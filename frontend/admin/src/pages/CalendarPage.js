import React, {useState} from 'react'
import Calendar from '../components/calendar/Calendar'

export const CalendarPage =()=> {
    // const [ date, setDate ] = useState(new Date(2021, 3, 1));
    // console.log(date)
    // const date = new Date(2021, 3, 1);
    const [homeUpdateFlag, setHomeUpdateFlag] = useState(false);
    document.title = '予約管理アプリ | カレンダー';

    return (
        <div className="container">
            <Calendar
                // date={date}
                // setDate={setDate}
                isMain={true}
                // individualOrGroup={props.individualOrGroup}
                homeUpdateFlag={homeUpdateFlag}
                setHomeUpdateFlag={setHomeUpdateFlag}
            />
        </div>
    )
}
