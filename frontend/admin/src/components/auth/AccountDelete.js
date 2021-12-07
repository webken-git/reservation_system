import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash  } from "@fortawesome/free-regular-svg-icons";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from '../../hooks/useSafeState';
import useUnmountRef from '../../hooks/useUnmountRef';
import './auth.scss';

const AccountDelete = (props) => {
    const unmountRef = useUnmountRef();
    const [loading, setLoading] = useSafeState(unmountRef, false);
    const [email, setEmail] = useSafeState(unmountRef, '');
    const [password, setPassword] = useSafeState(unmountRef, '');
    const [showPassword, setShowPassword] = useSafeState(unmountRef, false);
    const [message, setMessage] = useSafeState(unmountRef, '以下の項目を入力して下さい。');
    const [error, setError] = useSafeState(unmountRef, null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // 一度アカウントの確認を行い、成功したらアカウントを削除する
    const url = AuthUrls.TOKEN;
    const userDeleteUrl = AuthUrls.GET_USER_LIST;
    const onSubmit = () => {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        setLoading(true);
        setMessage('認証中です。');
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        })
            .then(res => {
                const userId = Cookies.get('user_id');
                axios.delete(`${userDeleteUrl}/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
                    .then(res => {
                        Cookies.remove('access_token');
                        Cookies.remove('refresh_token');
                        Cookies.remove('user_id');
                        setLoading(false);
                        setMessage('アカウントを削除しました。');
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 500);
                    })
                    .catch(err => {
                        setLoading(false);
                    });
            })
            .catch(err => {
                setLoading(false);
                setError(err.response.data);
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
            <div className="link">
                <h2 className="auth-page__title">{ message }</h2>
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
                    <button className="btn auth-btn" type="submit">アカウント削除</button>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default AccountDelete;
