import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { AuthUrls } from "../../utils/authUrls";
import authState from "../../recoil/auth";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";
import { login } from './Login';
import logo from '../../assets/image/logo.png';
import './auth.scss';

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const setAuthState = useSetRecoilState(authState);



    // アカウント作成処理
    const url = AuthUrls.REGISTRATION;
    const loginUrl = AuthUrls.LOGIN;
    const appSettingsUrl = ReservationUrls.APP_SETTING;

    const createAppSetting = (pk) => {
        setLoading(true);
        axios.post(appSettingsUrl, {
            'user_id': pk,
            'is_receive_announcement_email': true,
            'is_receive_reminder_email': true,
        })
            .then(res => {
                // アカウント作成処理が成功した場合、ローディング画面を非表示
                setLoading(false);
                // アカウント作成成功のメッセージを表示
                setSuccess("アカウント作成が完了しました。");
                setTimeout(() => {
                    window.location.href = "/";
                }, 500);
            })
            .catch(err => {
                // アカウント作成処理が失敗した場合、ローディング画面を非表示
                setLoading(false);
                // アカウント作成失敗のメッセージを表示
                setSuccess("アカウント作成に失敗しました。");
                console.log(err);
            });
    };

    const onSubmit = data => {
        let formData = new FormData();

        // フォームデータを追加
        formData.append('email', email);
        formData.append('password1', password);
        formData.append('password2', password);
        // アカウント作成処理中はローディング画面を表示
        setLoading(true);
        setSuccess(null);
        axios.post(url, formData)
            .then(res => {
                login(email, password, setLoading, setSuccess, setAuthState, loginUrl);
                createAppSetting(res.data.user.pk);
            })
            .catch(err => {
                // アカウント作成処理が失敗した場合
                // ローディング画面を非表示
                setLoading(false);
                // setError(err.response.data);
            });
    };

    // パスワード表示切り替え
    const hidePassword = () => {
        let passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            // アイコンをfaEyeに変更
            setShowPassword(true);
        } else {
            passwordInput.type = 'password';
            // アイコンをfaEyeSlashに変更
            setShowPassword(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__logo">
                <img src={logo} alt="logo" />
            </div>
            <h1 className="auth-page__title-registration">アカウント登録</h1>
            {success && <p className="success">{success}</p>}
            <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-page__form-group">
                    <label className="auth-page__form-label" htmlFor="email">メールアドレス</label>
                    {errors.email && <span className="auth-page__form-error">※この項目は必須です</span>}
                    <input
                        className="auth-page__form-input"
                        type="email"
                        name="email"
                        placeholder="samlple@example.com"
                        autoComplete="off"
                        // id="email"
                        {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-page__form-group">
                    <label className="auth-page__form-label" htmlFor="password">パスワード</label>
                    {errors.password && <span className="auth-page__form-error">※この項目は必須です</span>}
                    <div className="password-container">
                        <input
                            className="password"
                            type="password"
                            name="password"
                            id="password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                            })}
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="全角半角英数字8文字以上"
                        />
                        {
                            showPassword ?
                                <FontAwesomeIcon icon={faEye} id="btn-eye" onClick={hidePassword} /> :
                                <FontAwesomeIcon icon={faEyeSlash} id="btn-eye" onClick={hidePassword} />
                        }
                    </div>
                </div>
                <div className="auth-btn-wrapper">
                    <button type="submit" className="btn auth-btn">アカウント作成</button>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default Registration;
