import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash  } from "@fortawesome/free-regular-svg-icons";

import Loading from "../loading/Loading";
import authState from "../../recoil/auth/atom";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from '../../hooks/useSafeState';
import useUnmountRef from '../../hooks/useUnmountRef';
import './auth.scss';

const AccountDelete = (props) => {
    const unmountRef = useUnmountRef();
    const [loading, setLoading] = useSafeState(unmountRef, false);
    const setAuthState = useSetRecoilState(authState);
    const [email, setEmail] = useSafeState(unmountRef, '');
    const [password, setPassword] = useSafeState(unmountRef, '');
    const [showPassword, setShowPassword] = useSafeState(unmountRef, false);
    const [message, setMessage] = useSafeState(unmountRef, '以下の項目を入力して下さい。');
    const [user, setUser] = useSafeState(unmountRef, []);
    const [error, setError] = useSafeState(unmountRef, null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // 一度アカウントの確認を行い、成功したらアカウントを削除する
    const url = AuthUrls.STAFF_LOGIN;
    const userData = AuthUrls.GET_USER_DATA;
    const logout = AuthUrls.LOGOUT;
    const userDeleteUrl = AuthUrls.GET_USER_LIST;

    // ログインユーザー情報を取得
    const getUserData = async () => {
        try {
            const response = await axios.get(userData);
            setUser(response.data);
        } catch (error) {
            // console.log(error);
        }
    };

    const logoutUser = async () => {
        try {
            axios.post(logout);
        } catch (error) {
            // console.log(error);
        }
    };

    const onSubmit = () => {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        setLoading(true);
        getUserData();
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(res => {
                setMessage('アカウント削除処理中です。');
                // ログアウト
                logoutUser();
                axios.delete(`${userDeleteUrl}${user.pk}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => {
                        setLoading(false);
                        setMessage('アカウントを削除しました。');
                        setTimeout(() => {
                            setAuthState({
                                isAuthenticated: false,
                            });
                            window.location.href = '/login';
                        }, 500);
                    })
                    .catch(err => {
                        setLoading(false);
                    });

            })
            .catch(err => {
                setLoading(false);
                setError(err.response.data.non_field_errors);
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

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <button className="back-btn" type="button" onClick={() => window.history.back()}>戻る</button>
                    <span>　</span>
                    <button className="btn auth-btn" type="submit">アカウント削除</button>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default AccountDelete;
