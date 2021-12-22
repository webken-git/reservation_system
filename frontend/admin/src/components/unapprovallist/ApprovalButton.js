// 承認ボタンのコンポーネント
import React from "react";
import axios from "axios";
import Modal from 'react-modal'
// import { useParams } from 'react-router-dom'
import './approval_disapproval_button.scss'

const ApprovalButton = (props) => {
  const reservationId = props.id
  const approval = 2
  // データを承認リストに送るaxios
  const ApporovalSend = () => {
    axios.put(`${process.env.REACT_APP_API}/approval-applications/` + reservationId + '/', {
      approval_id: approval,
      reservation_id: reservationId,
      usage_fee: 0,
      heating_fee: 0,
      // electric_fee: 0,
      conditions: "string"
    })
      .then(response => {
        console.log('Success')
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
    <div className="approval-disapproval-button-wrapper">
      <p className="approval-button" onClick={() => setIsOpen(true)}>承認</p>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="buttom-modal-wrapper">
          <div className="modal-question-wrapper">
            <p className="modal-question">本当に承認しますか？</p>
          </div>
          <div className="modal-yesno-wrapper">
            <p className="modal-yes" onClick={() => ApporovalSend(reservationId)}>はい</p>
            <p className="modal-no" onClick={() => setIsOpen(false)}>いいえ</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ApprovalButton