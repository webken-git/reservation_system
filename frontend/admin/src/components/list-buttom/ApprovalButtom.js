// 承認ボタンのコンポーネント
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";
import "./list_send_button.scss";

const ApprovalButton = (props) => {
  // 承認ボタンのモーダルウィンドウ
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // データを承認リストに送るaxios
  const ApporovalSend = () => {
    setLoading(true);
    setMessage("承認メールを送信しています...");
    axios
      .patch(`${ReservationUrls.APPROVAL_APPLICATION}${props.id}/`, {
        approval_id: 2,
        reservation_id: props.reservation_id,
        usage_fee: getValues("usage_fee"),
        heating_fee: getValues("heating_fee"),
        electric_fee: getValues("electric_fee"),
      })
      .then((response) => {
        // console.log('Success')
        // console.log(response.date);
        setMessage("承認に成功しました");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        // console.log(error)
        setMessage("承認に失敗しました");
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
        className="approval-btn"
        onClick={() => setModalIsOpen(true)}
      >
        承認
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
              <h2>以下の項目を入力後、承認ボタンを押してください</h2>
              {message && <p className="message">{message}</p>}
            </div>
            <div className="modal-form-group">
              {errors.usage_fee && (
                <p className="modal-error">※この項目は必須です</p>
              )}
              <label className="modal-label">利用料金：</label>
              <input
                type="text"
                inputMode="numeric"
                name="usage_fee"
                className="modal-input"
                {...register("usage_fee", { required: true })}
              />
            </div>
            <div className="modal-form-group">
              {errors.electric_fee && (
                <p className="modal-error">※この項目は必須です</p>
              )}
              <label className="modal-label">電気料金：</label>
              <input
                type="text"
                inputMode="numeric"
                name="electric_fee"
                className="modal-input"
                {...register("electric_fee", { required: true })}
              />
            </div>
            <div className="modal-form-group">
              {errors.heating_fee && (
                <p className="modal-error">※この項目は必須です</p>
              )}
              <label className="modal-label">暖房料金：</label>
              <input
                type="text"
                inputMode="numeric"
                name="heating_fee"
                className="modal-input"
                {...register("heating_fee", { required: true })}
              />
            </div>
            <div className="modal-form-group">
              <button type="submit" className="btn">
                承認
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

export default ApprovalButton;
