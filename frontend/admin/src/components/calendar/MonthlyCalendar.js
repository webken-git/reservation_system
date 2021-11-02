import React, {useEffect, useState} from "react"
import axios from "axios"
import './calendar.scss'
import Head from './Head';
import Content from './Content';
import Select from './Select';

const MonthlyCalendar = (props) =>{
    const dayList = ['日', '月', '火', '水', '木', '金', '土'];
    const date = props.date;
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth() + 1)
    const calendar = createCalendar(year, month)
    const type = 'month';

    const onClick = (n) => () => {
        const nextMonth = month + n
        if (12 < nextMonth) {
            setMonth(1)
            setYear(year + 1)
        } else if (nextMonth < 1) {
            setMonth(12)
            setYear(year - 1)
        } else {
            setMonth(nextMonth)
        }
    }

    return (
        <div className="monthly-calendar">
            <div className="header">
                <Select
                    type={type}
                />
                <div className="today"><p>今日</p></div>
                <div className="button">
                    <button onClick={onClick(-1)}><p>{'prev'}</p></button>
                    <button onClick={onClick(1)}><p>{'next'}</p></button>
                </div>
                <p>{year+'年'+month+'月'}</p>
            </div>
            <table>
                <tbody>
                    <tr className="day-row">
                        {
                            dayList.map((day) => {
                            return <th>{day}</th>
                            })
                        }
                    </tr>
                    {calendar.map((week, i) => (
                        <tr key={week.join('')}>
                            {week.map((day, j) => (
                                <th key={i + j}>{day}</th>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const createCalendar = (year, month) => {
    const first = new Date(year, month - 1, 1).getDay()

    const last = new Date(year, month, 0).getDate()

    return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
        return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day -1 < first || last < day - first ? null : day - first
        })
    })
}

export default MonthlyCalendar;