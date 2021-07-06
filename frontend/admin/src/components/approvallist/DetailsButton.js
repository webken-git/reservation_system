// 詳細ボタンのコンポーネント
import React from 'react'
import './detailsbutton.scss'
import Modal from 'react-modal'

Modal.setAppElement("#root");

const DetailsButton = () => {
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
      top: "20rem",
      left: "3rem",
      right: "3rem",
      bottom: "20rem",
      backgroundColor: "white",
      // borderRadius: "1rem",
      padding: "1.5rem"
    }
  };

  return (
    <div className="App">
      <p onClick={() => setIsOpen(true)}>a</p>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="list-wrapper">
          <div className="scroll_box-wrapper">
            <div className="scroll_box">
            <p className="close" onClick={() => setIsOpen(false)}>Close Modal</p>
            </div>
          </div>
        </div>


      </Modal>
    </div>
  );
}

export default DetailsButton