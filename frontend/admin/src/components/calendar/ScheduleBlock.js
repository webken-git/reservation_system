import React, { useCallback, useEffect, useState } from "react";
import { withCookies } from "react-cookie";
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

  // console.log(props.schedule)
  // console.log(typeof(props.schedule))

  // console.log(props.schedule);

  // const onClick = (e) => {

  //     const protocol = window.location.protocol;
  //     console.log(protocol)
  //     const host = window.location.host;

  //     window.location.href = protocol+"//"+host+"/approvalInfo?id="+e;
  // }

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

      if (props.schedule.reservation.repeat_interval !== 1) {
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
        // if(props.schedule.repeat_interval === 2){
        //     scheduleStartDate = new Date(props.contentDate.getFullYear(), props.contentDate.getMonth(), props.contentDate.getDate());
        //     scheduleEndDate = new Date(props.contentDate.getFullYear(), props.contentDate.getMonth(), props.contentDate.getDate());
        // }
        // else if(props.schedule.repeat_interval === 3){
        //     let startTimeWeekday = props.contentDate.getDay();
        //     let scheduleStartTimeWeekday = startDate.getDay();
        //     let scheduleEndTimeWeekday = endDate.getDay();

        //     scheduleStartDate = new Date(props.contentDate.getFullYear(), props.contentDate.getMonth(), props.contentDate.getDate() - (startTimeWeekday >= scheduleStartTimeWeekday ? (startTimeWeekday - scheduleStartTimeWeekday) : 7 - (scheduleStartTimeWeekday - startTimeWeekday)));
        //     scheduleEndDate = new Date(props.contentDate.getFullYear(), props.contentDate.getMonth(), props.contentDate.getDate() + (scheduleEndTimeWeekday >= startTimeWeekday ? (scheduleEndTimeWeekday - startTimeWeekday) : 7 - (startTimeWeekday - scheduleEndTimeWeekday)));
        // }
        // else if(props.schedule.repeat_interval === 4){
        //     scheduleStartDate = new Date(props.contentDate.getFullYear(), props.contentDate.getMonth(), startDate.getDate())
        //     scheduleEndDate = new Date(props.contentDate.getFullYear(), props.contentDate.getMonth(), endDate.getDate())
        //     if(scheduleStartDate > scheduleEndDate){
        //         if(props.contentDate >= scheduleStartDate){
        //             scheduleEndDate.setMonth(scheduleEndDate.getMonth()+1);
        //         }
        //         else{
        //             scheduleStartDate.setMonth(scheduleStartDate.getMonth()-1);
        //         }
        //     }
        // }
        // else if(props.schedule.repeat_interval === 5){
        //     scheduleStartDate = new Date(props.contentDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        //     scheduleEndDate = new Date(props.contentDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        //     if(scheduleStartDate.getMonth() > scheduleEndDate.getMonth()){
        //         if(props.contentDate.getMonth() > scheduleEndDate.getMonth()){
        //             scheduleEndDate = new Date(props.contentDate.getFullYear()+1, endDate.getMonth(), endDate.getDate());
        //         }else{
        //             scheduleStartDate = new Date(props.contentDate.getFullYear()-1, startDate.getMonth(), startDate.getDate());
        //         }
        //     }
        // }
        setScheduleStartDate(scheduleStartDate);
        setScheduleEndDate(scheduleEndDate);
      }
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

    if (props.schedule.repeat_interval !== 1) {
      if (
        scheduleStartDate < scheduleEndDate &&
        props.contentDate.getTime() === scheduleEndDate.getTime()
      ) {
        top = 0;
        height = (endHours - 1) * 6 + (6 + endMinutes * 0.1);
      } else if (
        scheduleStartDate < scheduleEndDate &&
        props.contentDate.getTime() === scheduleStartDate.getTime()
      ) {
        top = startHours * 6 + 2 + startMinutes * 0.1;
        height =
          (25 - (startHours + 1)) * 6 + (6 - startMinutes * 0.1 + 0 * 0.1);
      } else if (
        scheduleStartDate < props.contentDate &&
        props.contentDate < scheduleEndDate
      ) {
        top = 0;
        height = 152;
      }
    }

    return styleGenerator(top, height);
  }, [
    startDate,
    endDate,
    props.contentDate,
    props.schedule.repeat_interval,
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    styleGenerator,
    scheduleStartDate,
    scheduleEndDate,
  ]);

  //modal
  //グループのスケジュール表示中アラート
  // const [isOpen, setIsOpen] = useState(false);
  // const [pageX, setPageX] = useState(0);
  // const [pageY, setPageY] = useState(0);

  // const groupScheduleAlertStyleGenerator = () => ({
  //     background: 'white',
  //     borderColor: 'gray',
  //     borderStyle: 'solid',
  //     borderWidth: '1px',
  //     borderRadius: '0.3em',
  //     color: 'black',
  //     position: 'fixed',
  //     width: '20vw',
  //     transform: 'translate(-50%, -50%)',
  //     padding: '10px',
  //     top: pageY,
  //     left: pageX,
  //     zIndex: '3',
  //     whiteSpace: 'pre-wrap',
  // });

  // function modalHandle(event){
  //     if(props.individualOrGroup === "individual"){
  //         if(props.schedule.repeat_interval === 1){
  //             props.setScheduleDict(props.schedule);
  //         }else{
  //             props.setScheduleDict({...props.schedule, "scheduleStartDate": scheduleStartDate, "scheduleEndDate": scheduleEndDate});
  //         }
  //         props.openModal();
  //     }else{
  //         setPageX(event.pageX > window.innerWidth * 0.9 ? window.innerWidth * 0.9 : event.pageX);
  //         setPageY(event.pageY > window.innerHeight * 0.95 ? window.innerHeight * 0.95 : event.pageY);
  //         setIsOpen(true);
  //         setTimeout(()=>{
  //             setIsOpen(false);
  //         }, 1000);
  //     }
  // }

  const id = props.schedule.reservation.id;

  if (
    props.schedule.approval.name !== "不承認" &&
    props.schedule.approval.name !== "不承認"
  ) {
    return (
      <Link
        className="schedule-block"
        // onClick={modalHandle}
        style={styleGeneratorHandler()}
        to={`/calendar/approval-info/${id}`}
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
            <p>{props.schedule.reservation.leader_name}</p>
          </span>
        ) : (
          <span>
            <p>{props.schedule.reservation.place.name}</p>
            <p>{props.schedule.reservation.group_name}</p>
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
      </Link>
    );
  } else {
    return null;
  }
};

export default withCookies(ScheduleBlock);
