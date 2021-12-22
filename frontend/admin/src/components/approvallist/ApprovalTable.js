// 承認リストの中身
import React from "react";
// import './approval.scss'
import DetailsButton from "./../list-buttom/DetailsButton"
import ApprovalCancelButton from "./../list-buttom/ApprovalCancelButtom"

const ApprovalTable = (props) => {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      {/* 予約日 */}
      <td>{props.date}</td>
      {/* 団体者名 */}
      <td>{props.group_name}</td>
      {/* 代表者名 */}
      <td>{props.reader_name}</td>
      {/* 個人or団体 */}
      {props.is_group ? <td>団体</td> : <td>個人</td>}
      {/* 予約時間 */}
      <td>{props.start_time}~{props.end_time}</td>
      {/* 人数 */}
      <td>{(props.organizer_number) + (props.participant_number)}</td>
      {/* 場所 */}
      <td>{props.place}</td>
      <ApprovalCancelButton id={props.id} />
      <DetailsButton
        // group_name={val.reservation.group_name}
        id={props.id}
        group={props.group_name}
        reader_name={props.reader_name}
        contact_name={props.contact_name}
        tel={props.tel}
        address={props.address}
        place={props.place}
        start_day={props.start_day}
        start_time={props.start_time}
        end_day={props.end_day}
        end_time={props.end_time}
        organizer_number={props.organizer_number}
        participant_number={props.participant_number}
        purpose={props.purpose}
        admission_fee={props.admission_fee}
      />
    </tr>
  )
}

export default ApprovalTable