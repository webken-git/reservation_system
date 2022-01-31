import React, { useEffect, useState } from "react";
import axios from "axios";
import "./calendar.scss";
// import Head from './Head';
// import Content from './Content';
import Select from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const MonthlyCalendar = (props) => {
  const dayList = props.dayList;
  const date = props.date;
  const [approvalList, setApprovalList] = useState([]);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [approvalFilter, setApprovalFilter] = useState(2);
  const calendar = createCalendar(year, month);
  const setLoading = props.setLoading;
  const calendarType = props.calendarType;
  const setCalendarType = props.setCalendarType;

  const onClick = (n) => () => {
    const nextMonth = month + n;
    if (12 < nextMonth) {
      setMonth(1);
      setYear(year + 1);
    } else if (nextMonth < 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(nextMonth);
    }
  };

  useEffect(() => {
    setLoading(true);
    let unmounted = false;
    axios
      .get(`${process.env.REACT_APP_API}/api/approval-count-monthly/`, {
        params: {
          approval: approvalFilter,
          year: year,
          month: month,
        },
      })
      .then((res) => {
        const approvalList = res.data;
        setLoading(false);
        console.log("approvalList: ", approvalList);
        setLoading(false);

        if (!unmounted) {
          setApprovalList(approvalList);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unmounted = true;
    };
  }, [year, month, approvalFilter]);

  return (
    <div className="monthly-calendar">
      <div className="header">
        {/* 表示するカレンダーの種類 */}
        <Select calendarType={calendarType} setCalendarType={setCalendarType} />

        <div className="date-title">
          <div className="last-button" onClick={onClick(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </div>
          <div className="date-title">
            <p>
              {year}年{month}月
            </p>
          </div>
          <div className="next-button" onClick={onClick(1)}>
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </div>
        </div>
      </div>

      <table>
        <tbody>
          <tr className="day-row">
            {dayList.map((day) => {
              return <th>{day}</th>;
            })}
          </tr>
          {calendar.map((week, i) => (
            <tr key={week.join("")}>
              {week.map((day, j) => (
                // <th key={i + j}>{day}</th>
                <th>
                  {day}
                  {approvalList.map((approval) =>
                    day === approval.day ? <p>{approval.count}件</p> : null
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const createCalendar = (year, month) => {
  const first = new Date(year, month - 1, 1).getDay();

  const last = new Date(year, month, 0).getDate();

  return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
    return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
      const day = dayIndex + 1 + weekIndex * 7;
      return day - 1 < first || last < day - first ? null : day - first;
    });
  });
};

export default MonthlyCalendar;
