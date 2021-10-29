// 未承認リストテーブルのコンポーネント
import React,{ useState } from "react";
// import './approval.scss'
import ApprovalButton from "./ApprovalButton"
import DisApprovalButton from "./DisApprovalButton"

const UnApprovalTable = (props) => {
  return(
    <tr>
      {/* 予約日 */}
      <td>{props.date}</td>
      {/* 代表者名 */}
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
      <td><ApprovalButton id={props.id}/></td>
      <td><DisApprovalButton/></td>
    </tr>
  )
}

export default UnApprovalTable