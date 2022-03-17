import React, { useEffect, useState } from "react";
import "./calendar.scss";
import Head from "./Head";
import Content from "./Content";
import Select from "./Select";
import MonthlyCalendar from "./MonthlyCalendar";
import Loading from "../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Box, HStack, Stack } from "@chakra-ui/react";
import DrawerMenu from "../sidebar/DrawerMenu";
import "../header/header.scss";
import UserIcon from "../header/usericon/UserIcon";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import axios from "axios";
import { ReservationUrls } from "../../utils/reservationUrls";
import ReserveStopSetting from "./ReserveStopSetting";

const Calendar = (props) => {
  const unmountRef = useUnmountRef();
  const dayList = ["日", "月", "火", "水", "木", "金", "土"];
  const [date, setDate] = useState(new Date());
  const [dateList, setDateList] = useState([]); //表示用のリスト
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [st, setSt] = useState(0);
  const [placeFilter, setPlaceFilter] = useState();
  const [calendarType, setCalendarType] = useState("weekly");
  const [approvalFilter, setApprovalFilter] = useState();
  const [loading, setLoading] = useState(true);
  const isMain = true;
  const [place, setPlace] = useSafeState(unmountRef, []);
  const [approvals, setApprovals] = useSafeState(unmountRef, []);

  const getPlaceList = () => {
    axios
      .get(ReservationUrls.PLACE)
      .then((response) => {
        const placeLists = response.data;
        setPlace(placeLists);
        setPlaceFilter(placeLists[0].name);
      })
      .catch((error) => {});
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

  // 検索する施設名を変数に代入
  const filtering = (e) => {
    console.log("filtering");
    setPlaceFilter(e.target.value);
  };

  const approvalFiltering = (e) => {
    setApprovalFilter(e.target.value);
  };

  const dateChange = (e) => {
    if (calendarType === "weekly") {
      if (e === "next") {
        const nextDate = new Date(date.setDate(date.getDate() + 7));
        setDate(nextDate);
      } else if (e === "last") {
        const nextDate = new Date(date.setDate(date.getDate() - 7));
        setDate(nextDate);
      }
    } else if (calendarType === "daily") {
      if (e === "next") {
        const nextDate = new Date(date.setDate(date.getDate() + 1));
        setDate(nextDate);
      } else if (e === "last") {
        const nextDate = new Date(date.setDate(date.getDate() - 1));
        setDate(nextDate);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    let unmounted = false;
    let dateDict = {};
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + i
      );
      dateDict["date" + i] = newDate;
    }
    for (let i = 1; i < 7; i++) {
      let newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - i
      );
      dateDict["mdate" + i] = newDate;
    }
    const sortDateList = () => {
      let dateList = [];
      for (let day = dateDict["date0"].getDay(); day > 0; day--) {
        dateList.push(dateDict["mdate" + day]);
      }
      for (let day = 0; day < 7 - dateDict["date0"].getDay(); day++) {
        dateList.push(dateDict["date" + day]);
      }
      if (!unmounted) {
        setDateList(dateList);
      }
    };
    sortDateList();
    getPlaceList();
    getApprovalList();

    return () => {
      unmounted = true;
    };
  }, [date, setDate, setCalendarType]);

  return (
    <div className="calendar-base">
      {calendarType === "monthly" ? (
        <MonthlyCalendar
          dayList={dayList}
          date={date}
          setDate={setDate}
          setCalendarType={setCalendarType}
          calendarType={calendarType}
          setLoading={setLoading}
          approvalFilter={approvalFilter}
          setApprovalFilter={setApprovalFilter}
        />
      ) : (
        <div className="maii">
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
              calendarType={calendarType}
              setCalendarType={setCalendarType}
            />
            {/* 日付表示・変更するボタン */}
            <div className="date-selector">
              <div className="last-button" onClick={() => dateChange("last")}>
                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
              </div>
              {calendarType === "daily" ? (
                <div className="date-base">
                  <p>
                    {year}年{month}月{day}日
                  </p>
                </div>
              ) : (
                <div className="date-base">
                  <p>
                    {year}月{month}月
                  </p>
                </div>
              )}
              <div className="next-button" onClick={() => dateChange("next")}>
                <FontAwesomeIcon icon={faChevronRight} size="2x" />
              </div>
            </div>
            <ReserveStopSetting />
            <UserIcon />
          </div>
          <div className="main">
            <div className="main-header">
              <div className="date-selector">
                <div className="last-button" onClick={() => dateChange("last")}>
                  <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </div>
                {calendarType === "daily" ? (
                  <div className="date-base">
                    <p>
                      {month}月{day}日
                    </p>
                    {/* <input type="date" className="date-input"/> */}
                  </div>
                ) : (
                  <div className="date-base">
                    <p>
                      {year}年{month}月
                    </p>
                    {/* <input type="date" className="date-input"/> */}
                  </div>
                )}
                <div className="next-button" onClick={() => dateChange("next")}>
                  <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </div>
              </div>
              <div className="filter-base">
                <select
                  className="filter"
                  defaultValue={place[0] && place[0].name}
                  onChange={(e) => filtering(e)}
                >
                  {place.map((i, index) => {
                    return (
                      <option value={i.name} key={index}>
                        {i.name}
                      </option>
                    );
                  })}
                </select>
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
            </div>
            <div className="head-row">
              <div className="timeline"></div>
              {calendarType === "weekly" ? (
                dateList.map((date, index) => {
                  return (
                    <Head
                      key={index}
                      day={dayList[index]}
                      date={date}
                      calendarType={calendarType}
                    />
                  );
                })
              ) : (
                <Head
                  // key={index}
                  // day={dayList[index]}
                  date={date}
                  calendarType={calendarType}
                />
              )}
            </div>
            <div className="content-row">
              {/* 現在時刻を表示する */}
              <div className="now-time" style={{ top: st }}>
                <div className="circle"></div>
                <div className="border"></div>
              </div>
              <div className="timeline">
                <div>
                  <p>9</p>
                </div>
                <div>
                  <p>10</p>
                </div>
                <div>
                  <p>11</p>
                </div>
                <div>
                  <p>12</p>
                </div>
                <div>
                  <p>13</p>
                </div>
                <div>
                  <p>14</p>
                </div>
                <div>
                  <p>15</p>
                </div>
                <div>
                  <p>16</p>
                </div>
                <div>
                  <p>17</p>
                </div>
                <div>
                  <p>18</p>
                </div>
                <div>
                  <p>19</p>
                </div>
                <div>
                  <p>20</p>
                </div>
                <div>
                  <p>21</p>
                </div>
              </div>
              {calendarType === "weekly" ? (
                dateList.map((date, index) => {
                  return (
                    <Content
                      key={index}
                      date={date}
                      updateFlag={updateFlag}
                      setUpdateFlag={setUpdateFlag}
                      isMain={isMain}
                      homeUpdateFlag={props.homeUpdateFlag}
                      setHomeUpdateFlag={props.setHomeUpdateFlag}
                      placeFilter={placeFilter}
                      setLoading={setLoading}
                      approvalFilter={approvalFilter}
                      calendarType={calendarType}
                    />
                  );
                })
              ) : (
                // <div className="daily-content">
                <Content
                  // key={index}
                  date={date}
                  // setScheduleDict={setScheduleDict}
                  // openModal={openModal}
                  updateFlag={updateFlag}
                  setUpdateFlag={setUpdateFlag}
                  isMain={isMain}
                  // individualOrGroup={props.individualOrGroup}
                  homeUpdateFlag={props.homeUpdateFlag}
                  setHomeUpdateFlag={props.setHomeUpdateFlag}
                  placeFilter={placeFilter}
                  setLoading={setLoading}
                  calendarType={calendarType}
                  approvalFilter={approvalFilter}
                />
                // </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Calendar;
