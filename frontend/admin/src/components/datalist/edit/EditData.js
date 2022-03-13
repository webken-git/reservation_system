import React, { useState } from "react";
import "./editdata.scss";
// import axios from "axios";
// import Modal from "react-modal";
// import { ReservationUrls } from "../../../utils/reservationUrls";

// Modal.setAppElement("#root");

const EditData = (props) => {
  const [content, setContent] = useState(props.tdclick);
  // const [modalIsOpen, setIsOpen] = useState(false);
  // const feeId = props.feeid;
  // const feeAgeId = props.feeageid;
  // const feeTimeId = props.feetimeid;
  // const feePlaceId = props.feeplaceid;

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // const editDataSend = () => {
  //   if (content === "") {
  //     return;
  //   }

  //   axios
  //     .patch(ReservationUrls.FACILITY_FEE + feeId + "/", {
  //       place_id: feePlaceId,
  //       age_id: feeAgeId,
  //       time_id: feeTimeId,
  //       fee: content,
  //     })
  //     .then((response) => {
  //       console.log("Success");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   if (content !== "") {
  //     setContent("");
  //   }
  // };

  return (
    <div className="editdata">
      {/* <span onClick={() => setIsOpen(true)}>{props.tdclick}</span> */}
      {/* <Modal
        className="editdata-modal"
        overlayClassName="editdata-overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <h4>{props.feeage}</h4>
        <h4>{props.feetime}</h4> */}
      <input
        type="text"
        className="editdata-input"
        value={content}
        placeholder={props.tdclick}
        inputMode="numeric"
        required="required"
        onChange={handleChange}
        // disabled={disabled}
      />
      {/* <button onClick={() => editDataSend()}>変更</button>
        <button onClick={() => setIsOpen(false)}>閉じる</button>
      </Modal> */}
    </div>
  );
};

export default EditData;
