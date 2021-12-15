import React from "react";
import Modal from 'react-modal'
import './mail-address-change.scss';
import RegisterButtom from "./../components/register-button/RegisterButtom";
export const MailAddressChange =()=> {
    // 登録ボタンのモーダルウィンドウ
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
    <div className="mail-address-change-wrapper">
      <p className="title">メールアドレスの変更</p>
      <input type="text" className="new-mail-address" required maxlength="50" placeholder="新しいメールアドレス" size="50"></input>
      <span className="register-buttom-wrapper" onClick={()=> setIsOpen(true)}>
        <RegisterButtom/>
      </span>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="buttom-modal-wrapper">
          <div className="modal-question-wrapper">
            <p className="modal-question">本当に変更しますか？</p>
          </div>
          <div className="modal-yesno-wrapper">
            <p className="modal-no" onClick={() => setIsOpen(false)}>キャンセル</p>
            <p className="modal-yes">変更する</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}