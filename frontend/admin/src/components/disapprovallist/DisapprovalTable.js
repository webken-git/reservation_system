// 不承認リストの中身
import React from "react";
import { useSetRecoilState } from "recoil";
// import './approval.scss'
import DetailsButton from "../listbutton/DetailsButton";
import reseravationData from "../../recoil/reservation";

const DisApprovalTable = (props) => {
  const setReservation = useSetRecoilState(reseravationData);

  // ラジオボタンのチェック状態をstateに保存
  const handleChange = (e) => {
    setReservation({ id: e.target.id });
  };
  return (
    <tr>
      <td>
        <input
          type="radio"
          id={props.id}
          name="approval"
          value={props.contact_name}
          onChange={handleChange}
        />
      </td>
      {/* 予約日 */}
      <td>
        <label htmlFor={props.id} className="approval-label">
          {props.date} {props.start_time}
        </label>
      </td>
      {/* 団体者名 */}
      <td>
        <label htmlFor={props.id} className="approval-label">
          {props.group_name}
        </label>
      </td>
      {/* 代表者名 */}
      <td>
        <label htmlFor={props.id} className="approval-label">
          {props.leader_name}
        </label>
      </td>
      {/* 予約時間 */}
      {/* <td>
        <label htmlFor={props.id} className="approval-label">
          {props.start_time}~{props.end_time}
        </label>
      </td> */}
      {/* 場所 */}
      <td>
        <label htmlFor={props.id} className="approval-label">
          {props.place}
        </label>
      </td>
      <td>
        {props.defferd_payment && props.defferd_payment.length > 0 ? "〇" : "×"}
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

export default DisApprovalTable;
