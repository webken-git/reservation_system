import React from 'react';
import Registration from '../components/auth/Registration';

export const RegistrationPage = () => {
    document.title = "アカウント登録 | 施設予約"; // ページタイトルを変更
    return <Registration />;
}
