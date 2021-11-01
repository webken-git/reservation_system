import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

/**
 * @author
 * @function Auth
 * **/

const Auth = (props) => {
    /**
     * ログイン処理を行う
    **/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies();

    const auth = (event) => {
        event.preventDefault();
        let formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        axios.post(`${process.env.REACT_APP_END_POINT}account/login/`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            // Login Success
            setCookie('access_token', res.data.access_token, { path: '/' }, { httpOnly: true });
            setCookie('refresh_token', res.data.refresh_token, { path: '/' }, { httpOnly: true });
            window.location.href = '/';
            console.log(cookies('access_token'));
        })
        .catch(err => {
            console.log(err.response.data);
            if(err.response.data.password) {
                setError(`password: ${err.response.data.password}`);
            }else if(err.response.data.email) {
                setError(`email: ${err.response.data.email}`);
            }else if(err.response.data.non_field_errors) {
                setError(err.response.data.non_field_errors);
            }
        });
    }

    // ログインフォーム（別ファイルに分けるのが面倒だったためここに記述）
    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__container__form">
                    <form onSubmit={auth}>
                        {
                            // エラーがあればエラーメッセージを表示
                            error &&
                            <div className="auth__container__form__error">
                                {error}
                            </div>
                        }
                        <div className="auth__container__form__input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="auth__container__form__input">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="auth__container__form__input">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;
