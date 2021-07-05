// キャンセルリスト全体のコンポーネント
import React from "react";
// import axios from "axios";
import './cancelbutton.scss'

// キャンセルボタンを押したら元にいたリストにいく。どうやって？
// const Cancel = () => {
//   axios.put('https://webhok.net/reservation_system/api/approval-applications/{id}')
//   .then(response => {

//   })
//   .catch((error) => {
//     console.log(error);
//   })
// }

const CancelButton = () => {
  return (
    <div className="cancel-button-wrapper"> 
      <p className="cancel-button">キャンセル</p>
    </div>
  )
}

export default CancelButton