// 詳細ボタンのコンポーネント
import React from 'react'
import './detailsbutton.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const DetailsButton = (props) => {
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
      top: "5rem",
      left: "30rem",
      right: "30rem",
      bottom: "5rem",
      backgroundColor: "white",
      // borderRadius: "1rem",
      padding: "1.5rem"
    }
  };

  return (
    <td className="list-button-wrapper">
      <p calssName="details-button" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </p>
      <Modal isOpen={modalIsOpen} style={modalStyle}>     
        <div className="list-wrapper">
          <div className="scroll_box-wrapper">
          <p className="close" onClick={() => setIsOpen(false)}>×</p>
            <div className="scroll_box">
              <p className="title">団体社名 </p>
              <p>{props.group_name}</p>
              <p className="title">代表者名  {props.reader_name}</p>
              <p>連絡者名 {props.contact_name}</p>
              <p>TEL {props.tel}</p>
              <p>住所 {props.address}</p>
              <p>使用(利用)体育施設の名称 {props.place}</p>
              <p>使用(利用)区分
                個人団体
                営利非営利
                入場料徴収するかしないか
              </p>
              <p>使用(利用)日時 {props.start_day}  {props.start_time}  ~  {props.end_day}  {props.end_time}</p>
              <p>使用(利用)目的 {props.purpose}</p> 
              <p>使用(利用)予定人数 {(props.organizer_number)+(props.participant_number)}</p>
              <p>特別設備等</p> 
              <p>入場料徴収 {props.admission_fee}円</p>
              {/* start_day={dayjs(val.reservation.start).format('YYYY/MM/DD')} */}
            </div>
          </div>
        </div>
      </Modal>
    </td>
  );
}

export default DetailsButton