// 承認取り消しボタンのコンポーネント
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";
import "./listbutton.scss";

const ApprovalCancelButtom = (props) => {
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
    setMessage("キャンセルメールを送信しています...");
    axios
      .patch(`${ReservationUrls.APPROVAL_APPLICATION}${props.id}/`, {
        approval_id: 4,
        reservation_id: props.reservation_id,
        cancellation_reason: getValues("cancellation_reason"),
      })
      .then((response) => {
        // console.log('Success')
        // console.log(response.date);
        setMessage("承認の取り消しに成功しました");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        // console.log(error)
        setMessage("承認の取り消しに失敗しました");
        setLoading(false);
        setTimeout(() => {
          // window.location.reload();
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
        className="approval-cancel-btn"
        onClick={() => setModalIsOpen(true)}
      >
        承認取り消し
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
              <h2>以下の項目を入力後、キャンセルボタンを押してください</h2>
              {message && <p className="message">{message}</p>}
            </div>
            <div className="modal-form-group">
              {errors.cancellation_reason && (
                <p className="modal-error">
                  {errors.cancellation_reason.message}
                </p>
              )}
              <label className="modal-label">承認取り消しの理由：</label>
              <input
                type="text"
                name="cancellation_reason"
                className="modal-input"
                {...register("cancellation_reason", {
                  required: "必須項目です",
                })}
              />
            </div>
            <div className="modal-form-group">
              <button type="submit" className="auth-btn">
                キャンセル
              </button>
              <span className="btn-space"></span>
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

export default ApprovalCancelButtom;
