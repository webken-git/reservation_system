import React, { useState, useEffect } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import ScheduleBlock from "./ScheduleBlock";
import UnapprovalBlock from "./UnapprovalBlock";
import SuspensionBlock from "./SuspensionBlock";
import { ReservationUrls } from "../../utils/reservationUrls";

const Content = (props) => {
  const [scheduleList, setScheduleList] = useState([]);
  const [contentDate, setContentDate] = useState(new Date());
  // const [ stringContentDate, setStringContentDate ] = useState("");
  const date = props.date;
  const cookies = props.cookies;
  const individualOrGroup = props.individualOrGroup;
  const setUpdateFlag = props.setUpdateFlag;
  const setHomeUpdateFlag = props.setHomeUpdateFlag;
  const filterType = props.filterType;
  const setLoading = props.setLoading;
  const approvalFilter = props.approvalFilter;
  const placeName = props.placeName;
  const calendarType = props.calendarType;
  const [count, setCount] = useState([]);
  const [suspensions, setSuspensions] = useState([]);
  const [approvalList, setApprovalList] = useState([]);

  // let suspensions = [];
  let approvals = [];
  let unapprovals = [];
  let typeBool = true;

  let unmounted = false;

  // console.log(placeName)

  const approvalDevide = (scheduleList) => {
    scheduleList.map((schedule, index) => {
      if (schedule.approval.name === "未承認"){
        unapprovals.push(schedule);
      } else if (schedule.approval.name === "承認") {
        approvals.push(schedule);
      }
    })
    setApprovalList(approvals);
    // setUnapprovalList(unapprovals);
    // console.log(unapprovals)

    let list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    unapprovals.map((unapproval, index) => {
      let startHours = Number(unapproval.reservation.start.substr(11, 2));
      let endHours = Number(unapproval.reservation.end.substr(11, 2));

      for (let i = startHours; i < endHours; i ++) {
        list[i-9] = list[i-9] + 1;
      }
    })
    setCount(list);
  }

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
  }

  const reservationPull = () => {
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    axios
      .get(`${ReservationUrls.APPROVAL_APPLICATION}`, {
        params: {
          reservation__start: year + "-" + month + "-" + day,
          reservation__place__name: placeName,
        },
      })
      .then((res) => {
        const scheduleList = res.data;
        setLoading(false);
        if (!unmounted) {
          setScheduleList(scheduleList);
          setUpdateFlag(false);
          approvalDevide(scheduleList);
          suspensionPull();
          // unapprovalCount(unapprovalList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    reservationPull();
    // suspensionPull();
    // approvalDevide(scheduleList);
    // unapprovalCount(unapprovalList);

    return () => {unmounted = true}
  }, [
    placeName,
    date,
    individualOrGroup,
    cookies,
    setUpdateFlag,
    setHomeUpdateFlag,
    filterType,
    setLoading,
    approvalFilter,
  ]);

  if (calendarType === "daily") {
    typeBool = false;
  } else {
    typeBool = true;
  }

    return (
      // <div className="content">
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
            {approvalList.map((schedule, index) => {
              return (
                <ScheduleBlock
                  key={uuidv4()}
                  schedule={schedule}
                  index={index}
                  setScheduleDict={props.setScheduleDict}
                  contentDate={contentDate}
                  count={count}
                />
              );
            })}
            {count.map((n, index) => {
              return (
                <UnapprovalBlock
                  hour={index}
                  count={n}
                />
              );
            })}
            {suspensions.map((suspension, index) => {
              return (
                <SuspensionBlock
                  suspension={suspension}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    );
  }

export default withCookies(Content);
