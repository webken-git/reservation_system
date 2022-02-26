import React, { useCallback, useEffect, useState } from "react";
import { withCookies } from "react-cookie";

const UnapprovalBlock = (props) => {

  const hour = props.hour;
  const count = props.count;

  const styleGenerator = useCallback(
    (top, height) => ({
      backgroundColor: backgroundColor,
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
    }),
    [backgroundColor]
  );

  const styleGeneratorHandler = useCallback(() => {
    let top = (hour+9) * 6 + 2 + startMinutes * 0.1;
    let height =
      (endHours - (hours + 10)) * 6 +
      (6 - startMinutes * 0.1 + endMinutes * 0.1);

    if (startDate < props.contentDate && startDate < endDate) {
      top = 0;
      height = (endHours - 1) * 6 + (6 + endMinutes * 0.1);
    }

    if (startDate < endDate && props.contentDate < endDate) {
      height = (25 - (hours + 10)) * 6 + (6 - startMinutes * 0.1 + 0 * 0.1);

      if (startDate < props.contentDate) {
        height = 152;
      }
    }

    return styleGenerator(top, height);
  }, [
    startDate,
    endDate,
    props.contentDate,
    startMinutes,
    endHours,
    endMinutes,
    styleGenerator,
    scheduleStartDate,
    scheduleEndDate,
  ]);

  return (
    <div
      className="schedule-block"
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
          {/* <p>{props.schedule.reservation.reader_name}</p> */}
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

export default withCookies(UnapprovalBlock);
