import React from 'react';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import LoginFormLayout from './LoginFormLayout';
import axios from 'axios';
import SpinnerModal from '../../components/Spinner';
import useAlert from '../../hooks/useAlert';
import useAuth from '../../hooks/useAuth';
import useSpinner from '../../hooks/useSpinner';
import { AuthUrls } from '../../utils/authUrls.js';

const LoginFormContainer = () => {
    // Alert Hooks
    const { createAlert } = useAlert();
    // 認証状態でルーティングするためのHooks
    const { loginUser, isAuthenticated } = useAuth();
    // Spinner Hooks
    const { startProgress, stopProgress, progress } = useSpinner();

    // ログインリクエストURL
    const loginUrl = AuthUrls.LOGIN;
    // スピナー
    let Modal = <SpinnerModal />;

    const onSubmit = async (data) => {
      // BackDropModalとスピナー表示
      startProgress("ログイン中");

      try {
        const response = await axios.post(loginUrl, data);
        loginUser();
        createAlert({
          message: "ログインに成功しました",
          type: "success",
        });
        stopProgress();
      } catch (error) {
        createAlert({
          message: "ログインに失敗しました",
          type: "danger",
        });
        stopProgress();
      }
    };

    // 認証状態でフォームチェンジ
    let form = <LoginForm onSubmit={onSubmit} />;

    if (isAuthenticated === true) {
      form = <LogoutForm />;
    }

    // スピナーを出す
    if (!progress) {
      Modal = <SpinnerModal show={false} />;
    }

    return (
      <React.Fragment>
        {Modal}
        <LoginFormLayout>{form}</LoginFormLayout>
      </React.Fragment>
    );
  };

  export default LoginFormContainer;
