// 不承認ボタンのコンポーネント
import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-modal'
import './list_send_button.scss'

const DisApprovalButton = (props) => {
  const reservationId = props.id
  const approval = 3
  const [DisApprovalReason, setDisApprovalReason] = useState("")

  const handleChange = (e) => {
    setDisApprovalReason(e.target.value)
  }

  const DisApporovalSend = () => {
    if (DisApprovalReason === "") {
      return;
    }
    // データを不承認リストに送るaxios
    axios.patch(`${process.env.REACT_APP_API}/api/approval-applications/` + reservationId + '/', {
      approval_id: approval,
      reservation_id: reservationId,
      // usage_fee: 0,
      // heating_fee: 0,
      // electric_fee: 0,
      conditions: DisApprovalReason,
    })
      .then(response => {
        console.log('Success')
        console.log(response.date);
      })
      .catch((error) => {
        console.log(error)
      })
    setIsOpen(false)
  }
  // 承認ボタンのモーダルウィンドウ
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.60)"
    },
    content: {
      position: "absolute",
      top: "13rem",
      left: "32rem",
      right: "32rem",
      bottom: "13rem",
      backgroundColor: "white",
      // borderRadius: "1rem",
      padding: "1.5rem"
    }
  };
  return (
    <div className="list-send-button-wrapper">
      <p className="disapproval-button" onClick={() => setIsOpen(true)}>不承認</p>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="buttom-modal-wrapper">
          <div className="modal-question-wrapper">
            <p className="modal-question">不承認の理由</p>
            <input type="text" value={DisApprovalReason} onChange={handleChange} />
          </div>
          <div className="modal-question-wrapper">
            <p className="modal-question">本当に不承認しますか？</p>
          </div>
          <div className="modal-yesno-wrapper">
            <p className="modal-yes" onClick={() => DisApporovalSend(reservationId)}>はい</p>
            <p className="modal-no" onClick={() => setIsOpen(false)}>いいえ</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DisApprovalButton
