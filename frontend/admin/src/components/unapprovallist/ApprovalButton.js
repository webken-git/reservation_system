// 承認ボタンのコンポーネント
import React from "react";
// import axios from "axios";
// import { useParams } from 'react-router-dom'
import './approval_disapproval_button.scss'

const ApprovalButton = (props) => {
  // const userId = props.id
  //   // データを承認リストに送るaxios
  //   const ApporovalSend = () => {
  //     axios.put('https://webhok.net/reservation_system/api/approval-applications' + userId)
  //     .then(response => {
  //       approval = 1
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //   }
  return (
    <div className="approval-disapproval-button-wrapper">
      <p className="approval-button">承認</p>
      {/* <p>{props.id}</p> */}
    </div>
  )  
}

export default ApprovalButton