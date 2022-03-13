import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";

const RegistrationComplete = (props) => {
  const unmountRef = useUnmountRef();
  const [loading, setLoading] = useSafeState(unmountRef, false);
  const [message, setMessage] = useSafeState(unmountRef, "");

  const accountConfirm = () => {
    setLoading(true);
    setMessage("アカウント確認中...");
    axios
      .post(AuthUrls.ACCOUNT_CONFIRM, {
        key: props.keys,
      })
      .then((res) => {
        setLoading(false);
        setMessage(
          "アカウント確認が完了しました。ログインページに移動し、ログインしてください。"
        );
      })
      .catch((err) => {
        setLoading(false);
        setMessage("アカウント確認に失敗しました。");
      });
  };

  useEffect(() => {
    accountConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="auth-page">
      <h1 className="auth-page__title-registration">アカウント確認</h1>
      <div className="auth-page__message">{message}</div>
      {loading === false && (
        <Link to="/login">
          <button
            type="button"
            className="btn"
            style={{
              width: "11rem",
            }}
          >
            ログインページへ
          </button>
        </Link>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default RegistrationComplete;
