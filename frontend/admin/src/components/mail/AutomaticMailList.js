import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import "./mail.scss";

const AutomaticMailList = () => {
  const unmountRef = useUnmountRef();
  const [automaticMailListData, setAutomaticMailListData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [subject, setSubject] = useState('');
  // const [body, setBody] = useState('');
  const [id, setId] = useSafeState("");
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useSafeState(unmountRef, false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const mailList = AuthUrls.AUTO_MAIL;
  const GetAutomaticMailList = () => {
    axios
      .get(mailList)
      .then((response) => {
        const data = response.data;
        setAutomaticMailListData(data);
        setLoading(false);
      })
      .catch((error) => {});
  };

  // モーダルの表示状態の変更
  const modalToggle = (s, b, i) => {
    // フォームの初期値を設定
    setValue("subject", s);
    setValue("body", b);
    // 編集するデータのIDを指定
    setId(i);
    setModalIsOpen(!modalIsOpen);
  };

  const onSubmit = (id) => {
    setLoading(true);
    let formData = new FormData();
    const subject = getValues("subject");
    const body = getValues("body");
    formData.append("subject", subject);
    formData.append("body", body);
    axios
      .patch(`${mailList}${id}/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setMessage("変更に失敗しました");
        setLoading(false);
      });
  };

  useEffect(() => {
    GetAutomaticMailList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mail-list send-mail">
        <div className="mail-list__title">
          <h2>自動送信メールリスト</h2>
          <Link to="/mail/send">
            <button type="button" className="btn mail-list__button">
              メール一斉送信
            </button>
          </Link>
        </div>
        <div className="mail-list__content">
          {automaticMailListData.map((val) => {
            return (
              <div key={val.id}>
                <details>
                  <summary>{val.name}</summary>
                  <div className="mail-list__content__detail">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => modalToggle(val.subject, val.body, val.id)}
                    >
                      編集
                    </button>
                    <div className="mail-list__content__detail__subject">
                      <label>件名：</label>
                      <p>{val.subject}</p>
                    </div>
                    <div className="mail-list__content__detail__body">
                      <label>本文：</label>
                      <p>{val.body}</p>
                    </div>
                  </div>
                </details>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={modalToggle}
                  className="modal-content send-mail"
                  overlayClassName="modal-overlay mail__overlay"
                  ariaHideApp={false}
                >
                  <div className="modal-content__title">
                    <h2>自動送信メール編集</h2>
                    <p className="red">
                      ※「{"{{ }}"}」で囲まれた部分は変更しないでください。
                    </p>
                  </div>
                  {message && <p className="send-mail__message">{message}</p>}
                  <form onSubmit={handleSubmit(() => onSubmit(id))}>
                    <div className="form-group">
                      <p htmlFor="subject">件名：</p>
                      {errors.subject && (
                        <span className="send-mail__form-error">
                          ※この項目は必須です
                        </span>
                      )}
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="form-control__input"
                        {...register("subject", {
                          required: true,
                        })}
                        // value={val.subject}
                        // onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <p>本文：</p>
                      {errors.body && (
                        <span className="send-mail__form-error">
                          ※この項目は必須です
                        </span>
                      )}
                      <textarea
                        name="body"
                        id="body"
                        className="form-control__textarea"
                        {...register("body", {
                          required: true,
                        })}
                        // value={body}
                        // onChange={(e) => setBody(e.target.value)}
                      >
                        {/* {body} */}
                      </textarea>
                    </div>
                    <button
                      className="back-btn"
                      type="button"
                      onClick={modalToggle}
                    >
                      戻る
                    </button>
                    <span>　</span>
                    <button className="verify-btn" type="submit">
                      完了
                    </button>
                  </form>
                  {loading && <Loading />}
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default AutomaticMailList;
