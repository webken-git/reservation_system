import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash  } from "@fortawesome/free-regular-svg-icons";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import { RegistrationButton } from './RegistrationButton';
import logo from '../../assets/image/logo.png';
import './auth.scss';
import Cookies from 'js-cookie';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [cookie, setCookie] = useCookies();
    const { register, handleSubmit, formState: { errors } } = useForm();
    axios.defaults.withCredentials = true;

    const GET_USER_DATA = AuthUrls.GET_USER_DATA;
    const pullData = () => {
        axios.get(GET_USER_DATA, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${Cookies.get('access_token')}`
            },
            withCredentials: true,
        })
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // ログイン処理
    const url = AuthUrls.LOGIN;
    const onSubmit = () => {
        let formData = new FormData();

        // フォームデータを追加
        formData.append('email', email);
        formData.append('password', password);
        // ログイン処理中はローディング画面を表示
        setLoading(true);
        setError(null);
        axios.post(url, formData, {
            headers: {
                'Accept': 'application/json',
            },
            withCredentials: true,
        })
            .then(res => {
                // ログイン処理が成功した場合
                // ローディング画面を非表示
                setLoading(false);
                // ログイン成功時にはセッションクッキーを設定
                setCookie('access_token', res.data.access_token, { path: '/' }, { httpOnly: true });
                setCookie('refresh_token', res.data.refresh_token, { path: '/' }, { httpOnly: true });
                // setCookie('user_id', res.data.user.pk, { path: '/' }, { httpOnly: true });
                console.log(res.data);
                // ログイン成功後、とりあえずトップページに遷移
                // window.location.href = '/';
                pullData();
            })
            .catch(err => {
                // ログイン処理が失敗した場合
                // ローディング画面を非表示
                setLoading(false);
                // エラーメッセージを表示
                console.log(err);
                // setError(err.response.data.non_field_errors);
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
            <div className="link">
            <h1 className="auth-page__title">ログイン</h1>
                <RegistrationButton />
            </div>
            {error && <p className="auth-page__error">{error}</p>}
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
                    <div className="auth-page__password">
                        <input
                            className="password"
                            type="password"
                            name="password"
                            id="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            })}
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            showPassword ?
                                <FontAwesomeIcon icon={faEye} id="btn-eye" onClick={hidePassword} /> :
                                <FontAwesomeIcon icon={faEyeSlash} id="btn-eye" onClick={hidePassword} />
                        }
                    </div>
                </div>
                <div className="auth-btn-wrapper">
                    <button className="btn auth-btn" type="submit">ログイン</button>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default Login;
