import React, { useEffect, useState } from "react";
// import axios from "axios"
import "../calendar.scss";
import Head from "../Head";
import Content from "../Content";
import Select from "../Select";
import ReserveMonthlyCalendar from "./ReserveMonthlyCalendar";
import Loading from "../../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import useSafeState from "../../../hooks/useSafeState";
import useUnmountRef from "../../../hooks/useUnmountRef";
import "../../header/header.scss";
import axios from "axios";

const ReserveCalendar = (props) => {
  const unmountRef = useUnmountRef();
  const [date, setDate] = useSafeState(unmountRef, new Date());
  const dayList = ["日", "月", "火", "水", "木", "金", "土"];
  const [dateList, setDateList] = useSafeState(unmountRef, []); //日付リスト
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const [calendarType, setCalendarType] = useSafeState(unmountRef, "weekly");
  const [loading, setLoading] = useSafeState(unmountRef, true);
  const placeId = props.placeId;
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
    placeSet(placeId);

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setCalendarType]);

  return (
    <div className="calendar-base">
      {calendarType !== "monthly" ? (
        <>
          <div className="header">
            {/* 表示するカレンダーの種類 */}
            <Select
              calendarType={calendarType}
              setCalendarType={setCalendarType}
            />

            <div className="annotation pc-tab">
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{ color: "dodgerblue" }}
                  />{" "}
                  = 承認済みの予約
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{ color: "tomato" }}
                  />{" "}
                  = 未承認の予約
                </li>
                <li>
                  <FontAwesomeIcon icon={faSquare} style={{ color: "red" }} /> =
                  予約停止中
                </li>
              </ul>
            </div>

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
          <div className="sp">
            <div className="header">
              <div className="annotation">
                <ul>
                  <li>
                    <FontAwesomeIcon
                      icon={faSquare}
                      style={{ color: "dodgerblue" }}
                    />{" "}
                    = 承認済みの予約
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faSquare}
                      style={{ color: "tomato" }}
                    />{" "}
                    = 未承認の予約
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faSquare} style={{ color: "red" }} />{" "}
                    = 予約停止中
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {calendarType === "monthly" ? (
        <ReserveMonthlyCalendar
          dayList={dayList}
          date={date}
          setDate={setDate}
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
                    calendarType={calendarType}
                  />
                );
              })
            ) : (
              <Head date={date} calendarType={calendarType} />
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
                    setLoading={setLoading}
                    placeFilter={placeName}
                    calendarType={calendarType}
                  />
                );
              })
            ) : (
              <Content
                date={date}
                setLoading={setLoading}
                placeFilter={placeName}
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

export default ReserveCalendar;
