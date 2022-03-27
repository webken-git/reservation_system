import React, { useState, useEffect } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { ReservationUrls } from "../../utils/reservationUrls";
import ScheduleBlock from "./ScheduleBlock";
import SuspensionBlock from "./SuspensionBlock";
// import { fil } from 'date-fns/locale';

const Content = (props) => {
  const [scheduleList, setScheduleList] = useState([]);
  const [contentDate, setContentDate] = useState(new Date());
  const [suspensions, setSuspensions] = useState([]);
  // const [ stringContentDate, setStringContentDate ] = useState("");
  const date = props.date;
  const cookies = props.cookies;
  const individualOrGroup = props.individualOrGroup;
  const count = props.count;
  const placeFilter = props.placeFilter;
  const setLoading = props.setLoading;
  const approvalFilter = props.approvalFilter;
  const calendarType = props.calendarType;

  let typeBool = true;

  const suspensionPull = () => {
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    axios
      .get(ReservationUrls.SUSPENSION, {
        params: {
          start: year + "-" + month + "-" + day,
        },
      })
      .then((res) => {
        const suspensionList = res.data;
        setSuspensions(suspensionList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let unmounted = false;
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    if (!unmounted) {
      setContentDate(new Date(Number(year), Number(month) - 1, Number(day)));
    }
    axios
      .get(`${ReservationUrls.APPROVAL_APPLICATION}`, {
        params: {
          approval: approvalFilter,
          reservation__start: year + "-" + month + "-" + day,
          reservation__place__name: placeFilter,
        },
      })
      .then((res) => {
        const scheduleList = res.data;
        setLoading(false);
        // console.log(unmounted);
        if (!unmounted) {
          setScheduleList(scheduleList);
          suspensionPull();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    date,
    individualOrGroup,
    cookies,
    placeFilter,
    count,
    setLoading,
    approvalFilter,
  ]);

  if (calendarType === "daily") {
    typeBool = false;
  } else {
    typeBool = true;
  }

  return (
    <div className={typeBool ? "content" : "daily-content"}>
      <div className="content-span">
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
        <div className="content-div"></div>
      </div>
      <div className="schedule-block-column">
        {suspensions.map((suspension, index) => {
          return (
            <SuspensionBlock
              suspension={suspension}
              placeFilter={placeFilter}
              key={index}
            />
          );
        })}
        {scheduleList.map((schedule, index) => {
          return (
            <ScheduleBlock
              key={uuidv4()}
              schedule={schedule}
              index={index}
              setScheduleDict={props.setScheduleDict}
              contentDate={contentDate}
              length={scheduleList.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withCookies(Content);
