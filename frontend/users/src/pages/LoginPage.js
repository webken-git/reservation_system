import React from 'react';

import Login from '../components/auth/Login';

export const LoginPage = () => {
    document.title = "ログイン | 施設予約"; // ページタイトルを変更
    return (
        <Login />
    );
};
