// 詳細ボタンのコンポーネント
import React from "react";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";

const UserDetailButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // userの削除
  const deleteUser = () => {
    setLoading(true);
    axios
      .delete(`${AuthUrls.GET_USER_LIST}${props.id}/`)
      .then((res) => {
        setMessage("削除しました");
        setLoading(false);
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
      <div className="details-button" onClick={() => setModalIsOpen(true)}>
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
          <p>以下のユーザーを削除場合は削除ボタンを押してください。</p>
          <p>
            削除すると元に戻せないため、削除する場合はよく確認してください。
            <br />
            尚、ユーザーの削除はスーパーユーザー権限が必要です。
          </p>
          {message && <p className="message">{message}</p>}
          <ul>
            <li>
              <label>メールアドレス：</label>
              <span>{props.email}</span>
            </li>
            <li>
              <label>管理者権限：</label>
              <span className="center">{props.is_staff ? "〇" : "×"}</span>
            </li>
            <li>
              <label>スーパーユーザー権限：</label>
              <span className="center">{props.is_superuser ? "〇" : "×"}</span>
            </li>
            <li>
              <label>登録日時：</label>
              <span>{props.created_at}</span>
            </li>
            <li>
              <label>最終ログイン日時：</label>
              <span>{props.last_login}</span>
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
          <span>　</span>
          <button type="button" className="approval-btn" onClick={deleteUser}>
            削除
          </button>
        </div>
        {loading && <Loading />}
      </Modal>
    </>
  );
};

export default UserDetailButton;