import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash  } from "@fortawesome/free-regular-svg-icons";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import './auth.scss';

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();


    // アカウント作成処理
    const url = AuthUrls.REGISTRATION;
    const onSubmit = data => {
        let formData = new FormData();

        // フォームデータを追加
        formData.append('email', email);
        formData.append('password1', password);
        formData.append('password2', password);
        // アカウント作成処理中はローディング画面を表示
        setLoading(true);
        // setError(null);
        setSuccess(null);
        axios.post(url, formData)
            .then(res => {
                // アカウント作成処理が成功した場合
                // ローディング画面を非表示
                setLoading(false);
                // アカウント作成成功のメッセージを表示
                setSuccess("アカウント作成が完了しました。");
                // アカウント作成が完了したら0.5秒後にログイン画面に遷移
                setTimeout(() => {
                    window.location.href = "/userlist";
                }, 500);
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
            <h1 className="auth-page__title-registration">アカウント登録</h1>
            {success && <p className="success">{success}</p>}
            <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
                {success && <p>{success}</p>}
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
                    <button type="submit" className="btn auth-btn">アカウント作成</button>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default Registration;
