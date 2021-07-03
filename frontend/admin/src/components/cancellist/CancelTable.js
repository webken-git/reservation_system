// キャンセルリストの中身
import React from "react";
import CancelButton from "./CancelButton"
// import './approval.scss'

const CancelTable = (props) => {
  return(
    <tr>
      {/* 予約日 */}
      <td>{props.date}</td>
      {/* 団体者名 */}
      <td>{props.group_name}</td>
      {/* 団体者名 */}
      <td>{props.reader_name}</td>
      {/* 目的 */}
      <td>{props.purpose}</td>
      {/* 予約時間 */}
      <td>{props.start}~{props.end}</td> 
      {/* 人数 */}
      <td>{(props.organizer_number)+(props.participant_number)}</td>
      {/* 場所 */}
      <td>{props.place}</td>
      <CancelButton/>
    </tr>
  )
}

export default CancelTable