// 不承認リストの中身
import React from "react";
import { useSetRecoilState } from "recoil";
// import './approval.scss'
import DetailsButton from "../list-buttom/DetailsButton";
import reservationState from "../../recoil/reservation/atom";

const DisApprovalTable = (props) => {
  const setReservationState = useSetRecoilState(reservationState);

  // ラジオボタンのチェック状態をstateに保存
  const handleChange = (e) => {
    setReservationState({ id: e.target.id });
  };
  return(
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
      <td><label for={props.id} className="approval-label">{props.date}</label></td>
      {/* 団体者名 */}
      <td><label for={props.id} className="approval-label">{props.group_name}</label></td>
      {/* 代表者名 */}
      <td><label for={props.id} className="approval-label">{props.reader_name}</label></td>
      {/* 予約時間 */}
      <td><label for={props.id} className="approval-label">{props.start_time}~{props.end_time}</label></td>
      {/* 場所 */}
      <td><label for={props.id} className="approval-label">{props.place}</label></td>
      <td>
        <DetailsButton
          id={props.id}
          reservation_id={props.reservation_id}
          group_name={props.group_name}
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
          email={props.email}
          approval={props.approval}
          usage_fee={props.usage_fee}
          electric_fee={props.electric_fee}
          heating_fee={props.heating_fee}
        />
      </td>
    </tr>
  )
}

export default DisApprovalTable
