// 承認ボタンのコンポーネント
import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import './approval_disapproval_button.scss'

const ApprovalButton = (props) => {
  const reservationId = props.id
  const approval = 2 
    // データを承認リストに送るaxios
    const ApporovalSend = () => {
      axios.put('https://webhok.net/reservation_system/api/approval-applications/' + reservationId + '/', {
        approval_id: approval,
        reservation_id: reservationId,
        usage_fee: 0,
        heating_fee: 0,
        electric_fee: 0,
        conditions: "string"
      })
      .then (response => {
        console.log('Success')
      })
      .catch ((error) => {
        console.log(error)
      })
    }

  return (
    <button onClick={() => ApporovalSend(reservationId)}>
      <div className="approval-disapproval-button-wrapper">
        <p className="approval-button">承認</p>
        {/* <p>{props.id}</p> */}
      </div>
    </button>
  )  
}

export default ApprovalButton