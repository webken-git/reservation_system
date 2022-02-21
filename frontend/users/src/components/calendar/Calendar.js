import React, { useEffect, useState } from "react";
// import axios from "axios"
import "./calendar.scss";
import Head from "./Head";
import Content from "./Content";
import Select from "./Select";
import MonthlyCalendar from "./MonthlyCalendar";
import Loading from "./../loading/Loading.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";
import "../header/header.scss";
import axios from "axios";

const Calendar = (props) => {
  const unmountRef = useUnmountRef();
  const [date, setDate] = useSafeState(unmountRef, new Date());
  const dayList = ["日", "月", "火", "水", "木", "金", "土"];
  // const [ scheduleDict, setScheduleDict ] = useState({});
  const [dateList, setDateList] = useSafeState(unmountRef, []); //日付リスト
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const setDate = props.setDate;
  const [updateFlag, setUpdateFlag] = useSafeState(unmountRef, false);
  const [, setSt] = useState(0);
  const [calendarType, setCalendarType] = useSafeState(unmountRef, "weekly");
  const [loading, setLoading] = useSafeState(unmountRef, true);
  const placeId = props.placeId;
  const isMain = true;
  const [placeName, setPlaceName] = useState();

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

  const placeSet = (e) => {
    axios
      .get(`${process.env.REACT_APP_API}/api/places/${e}`)
      .then((res) => {
        setPlaceName(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        // console.log('dateList:', dateList);
      }
    };
    sortDateList();
    placeSet(placeId);

    //現在時刻までスクロール
    // let margin = window.innerHeight * 0.02;
    // let blockHeight = window.innerHeight * 0.06;
    // let now = new Date();
    // let hours = now.getHours() - 4;
    // let st = now.getHours() < 4 ? 0 : margin + blockHeight * hours;
    // if (!unmounted) {
    //   setSt(margin + blockHeight * now.getHours());
    // }
    // document.getElementsByClassName("content-row")[0].scrollTo({
    //   top: st,
    //   left: 0,
    //   behavior: "smooth",
    // });

    return () => {
      unmounted = true;
    };
  }, [date, setCalendarType]);

  return (
    <div className="calendar-base">
      {calendarType !== "monthly" ? (
        <div className="header">
          {/* 表示するカレンダーの種類 */}
          <Select
            calendarType={calendarType}
            setCalendarType={setCalendarType}
          />

          <div className="date-title">
            <div className="last-button" onClick={() => dateChange("last")}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </div>

            <div className="date-title">
              {calendarType === "daily" ? (
                <p>
                  {year}年{month}月{day}日
                </p>
              ) : (
                <p>
                  {year}年{month}月
                </p>
              )}
            </div>

            <div className="next-button" onClick={() => dateChange("next")}>
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </div>
          </div>
        </div>
      ) : null}

      {calendarType === "monthly" ? (
        <MonthlyCalendar
          dayList={dayList}
          date={date}
          setCalendarType={setCalendarType}
          calendarType={calendarType}
          setLoading={setLoading}
        />
      ) : (
        <div className="main">
          <div className="head-row">
            <div className="timeline"></div>
            {calendarType === "weekly" ? (
              dateList.map((date, index) => {
                return (
                  <Head
                    key={index}
                    day={dayList[index]}
                    date={date}
                    // setScheduleDict={setScheduleDict}
                    // openModal={openModal}
                    updateFlag={updateFlag}
                    setUpdateFlag={setUpdateFlag}
                    isMain={isMain}
                    // individualOrGroup={props.individualOrGroup}
                    homeUpdateFlag={props.homeUpdateFlag}
                    setHomeUpdateFlag={props.setHomeUpdateFlag}
                    calendarType={calendarType}
                  />
                );
              })
            ) : (
              <Head
                // key={index}
                // day={dayList[index]}
                date={date}
                // setScheduleDict={setScheduleDict}
                // openModal={openModal}
                updateFlag={updateFlag}
                setUpdateFlag={setUpdateFlag}
                isMain={isMain}
                // individualOrGroup={props.individualOrGroup}
                homeUpdateFlag={props.homeUpdateFlag}
                setHomeUpdateFlag={props.setHomeUpdateFlag}
                calendarType={calendarType}
              />
            )}
          </div>

          <div className="content-row">
            {/* 現在時刻を表示する */}
            {/* <div className="now-time" style={{ top: st }}>
              <div className="circle"></div>
              <div className="border"></div>
            </div> */}

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
                    // setScheduleDict={setScheduleDict}
                    // openModal={openModal}
                    updateFlag={updateFlag}
                    setUpdateFlag={setUpdateFlag}
                    isMain={isMain}
                    // individualOrGroup={props.individualOrGroup}
                    homeUpdateFlag={props.homeUpdateFlag}
                    setHomeUpdateFlag={props.setHomeUpdateFlag}
                    setLoading={setLoading}
                    placeName={placeName}
                    calendarType={calendarType}
                  />
                );
              })
            ) : (
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
                setLoading={setLoading}
                calendarType={calendarType}
              />
            )}
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Calendar;
