// 詳細ボタンのコンポーネント
import React from 'react'
// import './detailsbutton.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const DetailsButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <p className="details-button" onClick={() => setModalIsOpen(true)}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </p>
      <Modal isOpen={modalIsOpen} onRequestClose={modalToggle} className="modal-content" overlayClassName="modal-overlay">
        <div className="modal-wrapper">
          <p>名前の予約</p>
          <p>日付</p>
          <p>場所</p>
          <p>承認状況</p>
          <p>aaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaa</p>
          {/* start_day={dayjs(val.reservation.start).format('YYYY/MM/DD')} */}
          <button type="button" className="back-btn" onClick={() => setModalIsOpen(false)}>閉じる</button>
        </div>
      </Modal>
    </>
  );
}

export default DetailsButton
