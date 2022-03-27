// 詳細ボタンのコンポーネント
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";

const UserDetailButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState([]);

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const GetUser = () => {
    setLoading(true);
    axios
      .get(`${AuthUrls.GET_USER_LIST}${props.id}/`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // userの削除
  const deleteUser = () => {
    setLoading(true);
    axios
      .delete(`${AuthUrls.GET_USER_LIST}${props.id}/`)
      .then((res) => {
        setMessage("削除しました");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setMessage("スーパーユーザー権限が無いため削除できません");
        } else {
          setMessage("削除に失敗しました");
        }
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="details-button"
        onClick={() => {
          setModalIsOpen(true);
          GetUser();
        }}
      >
        <FontAwesomeIcon icon={faSearchPlus} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalToggle}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-wrapper">
          <div className="modal-title">
            <h2>詳細</h2>
          </div>
          <p>以下のユーザーを削除する場合は削除ボタンを押してください。</p>
          <p>
            削除すると元に戻せないため、削除する場合はよく確認してください。
            <br />
            削除されたユーザーの予約データは削除されます。
            <br />
            尚、ユーザーの削除はスーパーユーザー権限が必要です。
          </p>
          {message && <p className="message red">{message}</p>}
          <ul>
            <li>
              <label>メールアドレス：</label>
              <span>{UserData.email}</span>
            </li>
            <li>
              <label>管理者権限：</label>
              <span>{UserData.is_staff ? "〇" : "×"}</span>
            </li>
            <li>
              <label>スーパーユーザー権限：</label>
              <span>{UserData.is_superuser ? "〇" : "×"}</span>
            </li>
            <li>
              <label>登録日時：</label>
              <span>{UserData.created_at}</span>
            </li>
            <li>
              <label>最終ログイン日時：</label>
              <span>{UserData.last_login}</span>
            </li>
          </ul>
          {/* start_day={dayjs(val.reservation.start).format('YYYY/MM/DD')} */}
          <button
            type="button"
            className="back-btn"
            onClick={() => setModalIsOpen(false)}
          >
            閉じる
          </button>
          <span className="btn-space"></span>
          <button
            type="button"
            className="approval-btn"
            onClick={deleteUser}
            disabled={props.auth.userId === props.id}
          >
            削除
          </button>
        </div>
        {loading && <Loading />}
      </Modal>
    </>
  );
};

export default UserDetailButton;
