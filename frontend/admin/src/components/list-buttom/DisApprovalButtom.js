// 不承認ボタンのコンポーネント
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";
import "./list_send_button.scss";

const DisApprovalButtom = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // データを不承認リストに送るaxios
  const ApporovalSend = () => {
    setLoading(true);
    setMessage("不承認メールを送信しています...");
    axios
      .patch(`${ReservationUrls.APPROVAL_APPLICATION}${props.id}/`, {
        approval_id: 3,
        reservation_id: props.reservation_id,
        conditions: getValues("conditions"),
      })
      .then((response) => {
        // console.log('Success')
        // console.log(response.date);
        setMessage("不承認に成功しました");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        // console.log(error)
        setMessage("不承認に失敗しました");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  };

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <button
        type="button"
        className="disapproval-btn"
        onClick={() => setModalIsOpen(true)}
      >
        不承認
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalToggle}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="buttom-modal-wrapper">
          <form onSubmit={handleSubmit(ApporovalSend)}>
            <div className="modal-title">
              <h2>以下の項目を入力後、不承認ボタンを押してください</h2>
              {message && <p className="message">{message}</p>}
            </div>
            <div className="modal-form-group">
              {errors.conditions && (
                <p className="modal-error">{errors.conditions.message}</p>
              )}
              <label className="modal-label">不承認の理由：</label>
              <input
                type="text"
                name="conditions"
                className="modal-input"
                {...register("conditions", {
                  required: "必須項目です",
                })}
              />
            </div>
            <div className="modal-form-group">
              <button type="submit" className="btn">
                不承認
              </button>
              <span>　</span>
              <button
                type="button"
                className="back-btn"
                onClick={() => setModalIsOpen(false)}
              >
                閉じる
              </button>
            </div>
          </form>
        </div>
        {loading && <Loading />}
      </Modal>
    </>
  );
};

export default DisApprovalButtom;
