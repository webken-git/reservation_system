import React from "react";
import Modal from 'react-modal'
import './pass-word-change.scss';
import RegisterButtom from "./../components/register-button/RegisterButtom";
export const PassWordChange =()=> {
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
    <div className="pass-word-change-wrapper">
      <p className="title">パスワードの変更</p>
      <input type="text" className="now-mail-address" required maxlength="50" placeholder="現在のパスワード" size="50"></input><br/>
      <input type="text" className="new-mail-address" required maxlength="50" placeholder="新しいパスワード" size="50"></input><br/>
      <input type="text" className="new-mail-address2" required maxlength="50" placeholder="新しいパスワードの確認" size="50"></input><br/>
      <div className="register-chancel-wrapper">
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
        {/* <ChancelButtom/> */}
      </div>
    </div>
  )
}