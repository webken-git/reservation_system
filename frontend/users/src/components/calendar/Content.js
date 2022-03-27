import React, { useState, useEffect } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import ScheduleBlock from "./ScheduleBlock";
import UnapprovalBlock from "./UnapprovalBlock";
import SuspensionBlock from "./SuspensionBlock";
import { ReservationUrls } from "../../utils/reservationUrls";

const Content = (props) => {
  const [contentDate, setContentDate] = useState(new Date());
  const date = props.date;
  const filterType = props.filterType;
  const setLoading = props.setLoading;
  const approvalFilter = props.approvalFilter;
  const placeName = props.placeName;
  const calendarType = props.calendarType;
  const [count, setCount] = useState([]);
  const [suspensions, setSuspensions] = useState([]);
  const [approvalList, setApprovalList] = useState([]);
  const change = props.change;
  const placeId = props.placeId;
  let unmounted = false;
  let approvals = [];
  let unapprovals = [];
  let typeBool = true;

  const approvalDevide = (scheduleList) => {
    scheduleList.map((schedule, index) => {
      if (schedule.approval.name === "未承認") {
        unapprovals.push(schedule);
      } else if (schedule.approval.name === "承認") {
        approvals.push(schedule);
      }
      return null;
    });
    setApprovalList(approvals);

    let list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    unapprovals.map((unapproval, index) => {
      let startHours = Number(unapproval.reservation.start.substr(11, 2));
      let endHours = Number(unapproval.reservation.end.substr(11, 2));

      for (let i = startHours; i < endHours; i++) {
        list[i - 9] = list[i - 9] + 1;
      }
      return null;
    });
    setCount(list);
  };

  const suspensionPull = () => {
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
      .get(ReservationUrls.SUSPENSION, {
        params: {
          start: year + "-" + month + "-" + day,
          places__id: placeId,
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

  const reservationCount = (scheduleList) => {
    let list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    scheduleList.map((schedule, index) => {
      let startHours = Number(schedule.reservation.start.substr(11, 2));
      let endHours = Number(schedule.reservation.end.substr(11, 2));

      if (
        schedule.approval.name === "キャンセル" ||
        schedule.approval.name === "不承認"
      ) {
      } else if (schedule.approval.name === "承認") {
        for (let i = startHours; i < endHours; i++) {
          list[i - 9] = 2;
        }
      } else if (schedule.approval.name === "未承認") {
        for (let i = startHours; i < endHours; i++) {
          if (list[i - 9] === 0) {
            list[i - 9] = 1;
          }
        }
      }
      return null;
    });
    setCount(list);
  };

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
        if (change) {
          approvalDevide(scheduleList);
          suspensionPull();
        } else {
          reservationCount(scheduleList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    reservationPull();
    // suspensionPull();
    // approvalDevide(scheduleList);
    // unapprovalCount(unapprovalList);

    return () => {
      unmounted = true;
    };
  }, [placeName, date, filterType, setLoading, approvalFilter, change]);

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

      {change ? (
        <div className="schedule-block-column">
          {count.map((n, index) => {
            return (
              <UnapprovalBlock
                key={index}
                hour={index}
                count={n}
                change={change}
              />
            );
          })}
          {approvalList.map((schedule, index) => {
            return (
              <ScheduleBlock
                key={index}
                schedule={schedule}
                contentDate={contentDate}
                count={count}
                change={change}
              />
            );
          })}
          {suspensions[0] &&
            suspensions.map((suspension, index) => {
              return (
                <SuspensionBlock
                  suspension={suspension}
                  key={index}
                  change={change}
                />
              );
            })}
        </div>
      ) : (
        <div className="schedule-block-column">
          {count.map((n, index) => {
            return (
              <UnapprovalBlock
                key={index}
                hour={index}
                count={n}
                change={change}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default withCookies(Content);
