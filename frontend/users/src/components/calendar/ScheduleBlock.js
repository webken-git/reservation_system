import React, { useCallback, useEffect, useState } from "react";
import { withCookies } from "react-cookie";

const ScheduleBlock = (props) => {
  // console.log('chedule')

  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [startMinutes, setStartMinutes] = useState("");
  const [endMinutes, setEndMinutes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduleStartDate, setScheduleStartDate] = useState(new Date());
  const [scheduleEndDate, setScheduleEndDate] = useState(new Date());

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setStartHours(Number(props.schedule.reservation.start.substr(11, 2)) - 9);
      setEndHours(Number(props.schedule.reservation.end.substr(11, 2)) - 9);
      setStartMinutes(Number(props.schedule.reservation.start.substr(14, 2)));
      setEndMinutes(Number(props.schedule.reservation.end.substr(14, 2)));
      let startDate = new Date(
        Number(props.schedule.reservation.start.substr(0, 4)),
        Number(props.schedule.reservation.start.substr(5, 2)) - 1,
        Number(props.schedule.reservation.start.substr(8, 2))
      );
      setStartDate(startDate);
      let endDate = new Date(
        Number(props.schedule.reservation.end.substr(0, 4)),
        Number(props.schedule.reservation.end.substr(5, 2)) - 1,
        Number(props.schedule.reservation.end.substr(8, 2))
      );
      setEndDate(endDate);
    }

    return () => {
      unmounted = true;
    };
  }, [props.schedule, props.contentDate]);

  let backgroundColor;

  if (props.schedule.approval.name === "承認") {
    backgroundColor = "blue";
  } else if (props.schedule.approval.name === "未承認") {
    backgroundColor = "tomato";
  } else if (props.schedule.approval.name === "不承認") {
    backgroundColor = "gray";
  } else if (props.schedule.approval.name === "キャンセル") {
    backgroundColor = "red";
  }

  const styleGenerator = useCallback(
    (top, height) => ({
      backgroundColor: backgroundColor,
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
    }),
    [backgroundColor]
  );

  const styleGeneratorHandler = useCallback(() => {
    let top = startHours * 6 + 2 + startMinutes * 0.1;
    let height =
      (endHours - (startHours + 1)) * 6 +
      (6 - startMinutes * 0.1 + endMinutes * 0.1);

    if (startDate < props.contentDate && startDate < endDate) {
      top = 0;
      height = (endHours - 1) * 6 + (6 + endMinutes * 0.1);
    }

    if (startDate < endDate && props.contentDate < endDate) {
      height = (25 - (startHours + 1)) * 6 + (6 - startMinutes * 0.1 + 0 * 0.1);

      if (startDate < props.contentDate) {
        height = 152;
      }
    }

    return styleGenerator(top, height);
  }, [
    startDate,
    endDate,
    props.contentDate,
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    styleGenerator,
    scheduleStartDate,
    scheduleEndDate,
    props.change
  ]);

  return (
    <div
      className="schedule-block"
      // onClick={modalHandle}
      style={styleGeneratorHandler()}
    >
      {props.schedule.repeat_interval === 1 ? (
        <p>
          {(startDate < props.contentDate || props.contentDate < endDate) &&
            Number(props.schedule.start.substr(5, 2)) +
              "月" +
              Number(props.schedule.start.substr(8, 2)) +
              "日"}
          {props.schedule.start_time.substr(11, 5)}
          {(startDate < props.contentDate || props.contentDate < endDate) && (
            <br />
          )}
          ~
          {(startDate < props.contentDate || props.contentDate < endDate) &&
            Number(props.schedule.reservation.end.substr(5, 2)) +
              "月" +
              Number(props.schedule.reservation.end.substr(8, 2)) +
              "日"}
          {props.schedule.reservation.end.substr(11, 5)}
        </p>
      ) : (
        <p>
          {(scheduleStartDate < props.contentDate ||
            props.contentDate < scheduleEndDate) &&
            scheduleStartDate.getMonth() +
              1 +
              "月" +
              scheduleStartDate.getDate() +
              "日"}
          {props.schedule.reservation.start.substr(11, 5)}
          {(scheduleStartDate < props.contentDate ||
            props.contentDate < scheduleEndDate) && <br />}
          ~
          {(scheduleStartDate < props.contentDate ||
            props.contentDate < scheduleEndDate) &&
            scheduleEndDate.getMonth() +
              1 +
              "月" +
              scheduleEndDate.getDate() +
              "日"}
          {props.schedule.reservation.end.substr(11, 5)}
        </p>
      )}
      {props.schedule.reservation.is_group === false ? (
        <span>
          <p>{props.schedule.reservation.place.name}</p>
          {/* <p>{props.schedule.reservation.leader_name}</p> */}
        </span>
      ) : (
        <span>
          <p>{props.schedule.reservation.place.name}</p>
          {/* <p>{props.schedule.reservation.group_name}</p> */}
        </span>
      )}
      {/* <span>
                <p>{props.schedule.place.name}</p>
                <p>{props.schedule.group_name}</p>
            </span> */}
      {/* {props.individualOrGroup === "individual" && (
                <span>
                    <p>{props.schedule.place.name}</p>
                    <p>{props.schedule.content}</p>
                </span>
            )} */}
      {/* {isOpen && (
                <div style={groupScheduleAlertStyleGenerator()}>
                    <span>グループのスケジュールを表示中なので編集できません</span>
                </div>
            )} */}
    </div>
  );
};

export default withCookies(ScheduleBlock);
