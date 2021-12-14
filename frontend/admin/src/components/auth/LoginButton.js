import React from 'react';
import './auth.scss';


export const LoginButton = () => {
    return (
        <button type="button" className="login-link" onClick={() => {
            window.location.href = '/login';
        }}>
            ログイン
        </button>
    );
};
