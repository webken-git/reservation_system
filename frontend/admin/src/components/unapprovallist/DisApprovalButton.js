// 不承認ボタンのコンポーネント
import React from "react";
// import axios from "axios";
// import { useParams } from 'react-router-dom'
import './approval_disapproval_button.scss'

const DisApprovalButton = (props) => {
  // const userId = props.id
  //   // データを不承認リストに送るaxios
  //   const DisApporovalSend = () => {
  //     axios.put('https://webhok.net/reservation_system/api/approval-applications' + userId)
  //     .then(response => {
  //       approval = 3
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //   }
  return (
    <div className="approval-disapproval-button-wrapper">
      <p className="disapproval-button"
      // onClick={DisApporovalSend}
      >
        不承認</p>
      {/* <p>{props.id}</p> */}
    </div>
  )  
}

export default DisApprovalButton