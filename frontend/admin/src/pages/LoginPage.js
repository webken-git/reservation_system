import React from 'react';

import Login from '../components/auth/Login';

export const LoginPage = () => {
    document.title = '予約管理アプリ | ログイン';
    return (
        <Login />
    );
};
