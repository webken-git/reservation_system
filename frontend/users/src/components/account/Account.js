import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Modal from "react-modal";
import authState from "../../recoil/auth";
import { AuthUrls } from "../../utils/authUrls";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";
import AppSettings from "./AppSettings";
import { useFetch } from "../../hooks/useFetch";
import "./account.scss";

export const Account = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useRecoilValue(authState);
  const GET_USER = AuthUrls.GET_USER_DATA;

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const UserInfoData = useFetch({
    url: `${ReservationUrls.USER_INFO}?user__id=${auth.userId}`,
  });
  const pullUserData = () => {
    setLoading(true);
    axios
      .get(GET_USER)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    pullUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="account-wrapper">
        <h2 className="title">アカウント</h2>
        <table className="mail-pass">
          <tbody>
            <tr className="mail-address">
              <td className="mail-pass-title">メールアドレス：</td>
              <td className="mail-pass-body">{user.email}</td>
              <td>
                <Link to="/account/email" className="account-link">
                  <span>変更</span>
                </Link>
              </td>
            </tr>
            <tr className="pass-word">
              <td className="mail-pass-title">パスワード：</td>
              <td className="mail-pass-body">***************</td>
              <td className="change-link">
                <Link to="/account/password" className="account-link">
                  <span>変更</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="user-info-title">保存されたユーザー情報：</td>
              <td className="user-info-body">
                {UserInfoData && UserInfoData.length > 0
                  ? `${UserInfoData[0].group_name} ...`
                  : "保存されたユーザー情報はありません"}
              </td>
              {UserInfoData && UserInfoData.length > 0 ? (
                <td className="user-info-link">
                  <span className="user-info-detail" onClick={modalToggle}>
                    詳細
                  </span>
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
                      <ul>
                        <li>
                          <label>団体名：</label>
                          <span>{UserInfoData[0].group_name}</span>
                        </li>
                        <li>
                          <label>代表者名：</label>
                          <span>{UserInfoData[0].reader_name}</span>
                        </li>
                        <li>
                          <label>連絡者名：</label>
                          <span>{UserInfoData[0].contact_name}</span>
                        </li>
                        <li>
                          <label>住所：</label>
                          <span>{UserInfoData[0].address}</span>
                        </li>
                        <li>
                          <label>電話番号：</label>
                          <span>{UserInfoData[0].tel}</span>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="back-btn"
                        onClick={() => setModalIsOpen(false)}
                      >
                        閉じる
                      </button>
                    </div>
                  </Modal>
                </td>
              ) : null}
            </tr>
            <AppSettings />
            <tr className="mail-address">
              <td className="mail-pass-title">
                <Link to="/account/delete" className="account-link">
                  <span>アカウント削除</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Account;
