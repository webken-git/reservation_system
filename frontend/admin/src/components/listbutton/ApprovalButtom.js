// 承認ボタンのコンポーネント
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";
import "./listbutton.scss";

const ApprovalButton = (props) => {
  // 承認ボタンのモーダルウィンドウ
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isIssued, setIsIssued] = useState(false);
  const [isSendMail, setIsSendMail] = useState(false);
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
    setMessage("承認処理中です...");
    axios
      .patch(`${ReservationUrls.APPROVAL_APPLICATION}${props.id}/`, {
        approval_id: 2,
        reservation_id: props.reservation_id,
        usage_fee: getValues("usage_fee"),
        heating_fee: getValues("heating_fee"),
        electric_fee: getValues("electric_fee"),
        is_issued: isIssued,
        is_send_mail: isSendMail,
        document_id: 1,
        number: getValues("number"),
        approval_application_id: props.id,
      })
      .then((response) => {
        if (props.defferd_payment.length > 0) {
          axios
            .patch(
              `${ReservationUrls.DEFFERD_PAYMENT}${props.defferd_payment[0].id}/`,
              {
                reservation: props.reservation_id,
                fee: getValues("defferd_payment_fee"),
              }
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {});
        }
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
              <p className="modal-text">
                承認通知書を発行しメール送信をする場合、
                <br />
                発行された承認通知書のPDFファイルを添付し、メール送信ボタンを行います。
              </p>
              {message && <p className="message">{message}</p>}
            </div>
            <div className="modal-form-group">
              {errors.usage_fee && (
                <p className="modal-error">{errors.usage_fee.message}</p>
              )}
              <p>利用料金：</p>
              <input
                type="text"
                inputMode="numeric"
                name="usage_fee"
                className="modal-input"
                {...register("usage_fee", {
                  required: "必須項目です",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "数字を入力してください",
                  },
                })}
              />
            </div>
            <div className="modal-form-group">
              {errors.electric_fee && (
                <p className="modal-error">{errors.electric_fee.message}</p>
              )}
              <p>電気料金：</p>
              <input
                type="text"
                inputMode="numeric"
                name="electric_fee"
                className="modal-input"
                {...register("electric_fee", {
                  required: "必須項目です",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "数字を入力してください",
                  },
                })}
              />
            </div>
            <div className="modal-form-group">
              {errors.heating_fee && (
                <p className="modal-error">{errors.heating_fee.message}</p>
              )}
              <p>暖房料金：</p>
              <input
                type="text"
                inputMode="numeric"
                name="heating_fee"
                className="modal-input"
                {...register("heating_fee", {
                  required: "必須項目です",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "数字を入力してください",
                  },
                })}
              />
            </div>
            {props.defferd_payment.length > 0 && (
              <div className="modal-form-group">
                {errors.defferd_payment_fee && (
                  <p className="modal-error">
                    {errors.defferd_payment_fee.message}
                  </p>
                )}
                <p>後納使用料金：</p>
                <input
                  type="text"
                  inputMode="numeric"
                  name="defferd_payment_fee"
                  className="modal-input"
                  {...register("defferd_payment_fee", {
                    required: "必須項目です",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "数字を入力してください",
                    },
                  })}
                />
              </div>
            )}
            <div className="modal-form-group">
              {errors.is_issued && (
                <p className="modal-error">{errors.is_issued.message}</p>
              )}
              <p>承認通知書の発行：</p>
              <input
                type="radio"
                name="is_issued"
                id="is_issued_true"
                className="modal-radio"
                value="true"
                {...register("is_issued", {
                  required: "必須項目です",
                })}
                onChange={() => setIsIssued(true)}
              />
              <label htmlFor="is_issued_true">発行する</label>
              <input
                type="radio"
                name="is_issued"
                id="is_issued_false"
                className="modal-radio"
                value="false"
                {...register("is_issued", {
                  required: "必須項目です",
                })}
                onChange={() => setIsIssued(false)}
              />
              <label htmlFor="is_issued_false">発行しない</label>
            </div>
            {isIssued && (
              <>
                <div className="modal-form-group">
                  {errors.number && (
                    <p className="modal-error">{errors.number.message}</p>
                  )}
                  <p>承認通知書に記載する発行番号を入力：</p>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="number"
                    className="modal-input"
                    autoComplete="off"
                    {...register("number", {
                      required: "必須項目です",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "数字を入力してください",
                      },
                    })}
                  />
                </div>
              </>
            )}
            <div className="modal-form-group">
              {errors.is_send_mail && (
                <p className="modal-error">{errors.is_send_mail.message}</p>
              )}
              <p>メール送信：</p>
              <input
                type="radio"
                name="is_send_mail"
                id="is_send_mail_true"
                className="modal-radio"
                value="true"
                {...register("is_send_mail", {
                  required: "必須項目です",
                })}
                onChange={() => setIsSendMail(true)}
              />
              <label htmlFor="is_send_mail_true">送信する</label>
              <input
                type="radio"
                name="is_send_mail"
                id="is_send_mail_false"
                className="modal-radio"
                value="false"
                {...register("is_send_mail", {
                  required: "必須項目です",
                })}
                onChange={() => setIsSendMail(false)}
              />
              <label htmlFor="is_send_mail_false">送信しない</label>
            </div>
            <div className="modal-form-group">
              <button type="submit" className="btn">
                承認
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

export default ApprovalButton;
