// 承認リストの中身
import React from "react";
// import './approval.scss'
import DetailsButton from "./DetailsButton"

const ApprovalTable = (props) => {
  return(
    <tr>
      {/* 予約日 */}
      <td>{props.date}</td>
      {/* 団体者名 */}
      <td>{props.group_name}</td>
      {/* 代表者名 */}
      <td>{props.reader_name}</td>
      {/* 目的 */}
      <td>{props.purpose}</td>
      {/* 予約時間 */}
      <td>{props.start}~{props.end}</td>
      {/* 人数 */}
      <td>{(props.organizer_number)+(props.participant_number)}</td>
      {/* 場所 */}
      <td>{props.place}</td>
      <DetailsButton/>
    </tr>
  )
}

export default ApprovalTable