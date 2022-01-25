// 詳細ボタンのコンポーネント
import React from 'react'
// import './detailsbutton.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

// const GetUserDetails = () => {
//   axios.get(`${process.env.REACT_APP_API}/api/reservations/approval-applications/`)
//     .then(response => {
//       const data = response.data;
//       console.log(data)
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }

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
    <div className="list-button-wrapper">
      <p className="details-button" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </p>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="list-wrapper">
          <div className="scroll_box-wrapper">
            <p className="close" onClick={() => setIsOpen(false)}>×</p>
            <div className="scroll_box">
              <p>の予約</p>
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
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DetailsButton
