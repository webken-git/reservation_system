import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ScheduleBlock = (props) => {
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
      setStartHours(Number(props.schedule.reservation.start.substr(11, 2)));
      setEndHours(Number(props.schedule.reservation.end.substr(11, 2)));
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

      let scheduleStartDate = "";
      let scheduleEndDate = "";
      scheduleStartDate = new Date(
        props.contentDate.getFullYear(),
        props.contentDate.getMonth(),
        props.contentDate.getDate()
      );
      scheduleEndDate = new Date(
        props.contentDate.getFullYear(),
        props.contentDate.getMonth(),
        props.contentDate.getDate()
      );
      setScheduleStartDate(scheduleStartDate);
      setScheduleEndDate(scheduleEndDate);
    }

    return () => {
      unmounted = true;
    };
  }, [props.schedule, props.contentDate]);

  let backgroundColor;

  if (props.schedule.approval.name === "承認") {
    backgroundColor = "dodgerblue";
  } else if (props.schedule.approval.name === "未承認") {
    backgroundColor = "tomato";
  } else if (props.schedule.approval.name === "不承認") {
    backgroundColor = "gray";
  } else if (props.schedule.approval.name === "キャンセル") {
    backgroundColor = "lightsteelblue";
  }

  const styleGenerator = useCallback(
    (top, height) => ({
      backgroundColor: backgroundColor,
      width: 100 / props.length + "%",
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
      // Zindex: "auto",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [backgroundColor]
  );

  const styleGeneratorHandler = useCallback(() => {
    let top = startHours * 6 - 52 + startMinutes * 0.1;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  ]);

  const id = props.schedule.id;

  // document.getElementById('style-add').style.width = `${100 / props.index}%`;

  return (
    <Link
      className="schedule-block"
      id="style-add"
      style={styleGeneratorHandler()}
      to={`/calendar/approval-info/${id}`}
    >
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
      {/* 個人か団体かで表示する名前を変更 */}
      {props.schedule.reservation.is_group === false ? (
        <span>
          {props.schedule.reservation.place.min === 1 &&
          props.schedule.reservation.place.max === 1 ? null : (
            <p>
              {(props.schedule.reservation.place.min === 0.5 &&
                (props.schedule.reservation.place_number === 0.5
                  ? "半面"
                  : "全面")) ||
                (props.schedule.reservation.place.max > 1 &&
                  props.schedule.reservation.place_number) + "シート"}
            </p>
          )}
          <p>{props.schedule.reservation.leader_name}</p>
        </span>
      ) : (
        <span>
          {props.schedule.reservation.place.min === 1 &&
          props.schedule.reservation.place.max === 1 ? null : (
            <p>
              {(props.schedule.reservation.place.min === 0.5 &&
                (props.schedule.reservation.place_number === 0.5
                  ? "半面"
                  : "全面")) ||
                (props.schedule.reservation.place.max > 1 &&
                  props.schedule.reservation.place_number) + "シート"}
            </p>
          )}
          <p>{props.schedule.reservation.group_name}</p>
        </span>
      )}
    </Link>
  );
};

export default ScheduleBlock;
