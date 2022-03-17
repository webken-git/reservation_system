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
import { Box, HStack, Stack } from "@chakra-ui/react";
import DrawerMenu from "../sidebar/DrawerMenu";
import "../header/header.scss";
import UserIcon from "../header/usericon/UserIcon";
import ReserveStopSetting from "./ReserveStopSetting";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import { ReservationUrls } from "../../utils/reservationUrls";



const MonthlyCalendar = (props) => {
  const unmountRef = useUnmountRef();
  const dayList = props.dayList;
  const date = props.date;
  const setDate = props.setDate;
  const [approvalList, setApprovalList] = useState([]);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const calendar = createCalendar(year, month);
  const setLoading = props.setLoading;
  const approvalFilter = props.approvalFilter;
  const setApprovalFilter = props.setApprovalFilter;
  // const [approvalFilter, setApprovalFilter] = useState();
  const [approvals, setApprovals] = useSafeState(unmountRef, []);

  const onClick = (n) => () => {
    const nextMonth = month + n;
    if (12 < nextMonth) {
      setMonth(1);
      setYear(year + 1);
      setDate(new Date(year + 1, 0, 1))
    } else if (nextMonth < 1) {
      setMonth(12);
      setYear(year - 1);
      setDate(new Date(year - 1, 11, 1))
    } else {
      setMonth(nextMonth);
      setDate(new Date(date.getFullYear(), nextMonth - 1, 1))
    }
  };

  const approvalFiltering = (e) => {
    setApprovalFilter(e.target.value);
  };

  const getApprovalList = () => {
    axios
      .get(ReservationUrls.APPROVALS)
      .then((response) => {
        const approvalLists = response.data;
        setApprovals(approvalLists);
        setApprovalFilter(approvalLists[0].id);
      })
      .catch((error) => {});
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

        setApprovalList(approvalList);
        if(approvals.length === 0){
          getApprovalList();
        }

      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unmounted = true;
    };
  }, [year, month, approvalFilter, setApprovalFilter, setLoading]);

  return (
    <div className="monthly-calendar">
      <div className="header">
        <Stack>
          <HStack p={5} className="drawer-menu">
            <Box display={{ base: "block", md: "none" }}>
              <DrawerMenu />
            </Box>
          </HStack>
        </Stack>

        {/* <div className="header_title">{props.pagename}</div> */}
        <div className="header_title">カレンダー</div>
        {/* 各ページにあった名前に変更できるようにpropsにする */}
        {/* 表示するカレンダーの種類 */}
        <Select
          calendarType={props.calendarType}
          setCalendarType={props.setCalendarType}
        />
        <div className="date-selector">
          <div className="last-button" onClick={onClick(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </div>
          <p>
            {year}年{month}月
          </p>
          <div className="next-button" onClick={onClick(1)}>
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </div>
        </div>
        <ReserveStopSetting />
        <UserIcon />
      </div>

      <div className="filter-base">
        <select
          className="filter"
          defaultValue={approvals[0] && approvals[0].id}
          onChange={(e) => approvalFiltering(e)}
        >
          {approvals.map((i, index) => {
            return (
              <option value={i.id} key={index}>
                {i.name}
              </option>
            );
          })}
        </select>
      </div>

      <table>
        <tbody>
          <tr className="day-row">
            {dayList.map((day, index) => {
              return (
                <th day={day} key={index}>
                  {day}
                </th>
              );
            })}
          </tr>
          {calendar.map((week, i) => (
            <tr key={week.join("")}>
              {week.map((day, j) => (
                // <th key={i + j}>{day}</th>
                <th key={j}>
                  {day}
                  {approvalList.map((approval, k) =>
                    day === approval.day ? (
                      <p key={k}>{approval.count}件</p>
                    ) : null
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
