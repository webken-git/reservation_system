// 未承認リストテーブルのコンポーネント
import React from "react";
// import './approval.scss'
import ApprovalButtom from "../listbutton/ApprovalButtom";
import DisApprovalButtom from "../listbutton/DisApprovalButtom";
import DetailsButton from "../listbutton/DetailsButton";

const UnApprovalTable = (props) => {
  return (
    <tr>
      {/* 予約日 */}
      <td>
        {props.date} {props.start_time}
      </td>
      {/* 代表者名 */}
      <td>{props.group_name}</td>
      {/* 団体者名 */}
      <td>{props.leader_name}</td>
      {/* 予約時間 */}
      {/* <td>
        {props.start_time}~{props.end_time}
      </td> */}
      {/* 場所 */}
      <td>{props.place}</td>
      <td>
        {props.defferd_payment && props.defferd_payment.length > 0 ? "〇" : "×"}
      </td>
      <td>
        <ApprovalButtom
          id={props.id}
          reservation_id={props.reservation_id}
          defferd_payment={props.defferd_payment}
        />
        <span>　</span>
        <DisApprovalButtom
          id={props.id}
          reservation_id={props.reservation_id}
          defferd_payment={props.defferd_payment}
        />
      </td>
      <td>
        <DetailsButton
          id={props.id}
          reservation_id={props.reservation_id}
          group_name={props.group_name}
          leader_name={props.leader_name}
          contact_name={props.contact_name}
          tel={props.tel}
          address={props.address}
          place={props.place}
          place_min={props.place_min}
          place_max={props.place_max}
          place_number={props.place_number}
          start_day={props.start_day}
          start_time={props.start_time}
          end_day={props.end_day}
          end_time={props.end_time}
          organizer_number={props.organizer_number}
          participant_number={props.participant_number}
          purpose={props.purpose}
          admission_fee={props.admission_fee}
          equipment={props.equipment}
          special_equipment={props.special_equipment}
          email={props.email}
          approval={props.approval}
          usage_fee={props.usage_fee}
          electric_fee={props.electric_fee}
          heating_fee={props.heating_fee}
          defferd_payment={props.defferd_payment}
        />
      </td>
    </tr>
  );
};

export default UnApprovalTable;