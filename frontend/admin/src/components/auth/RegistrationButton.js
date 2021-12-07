import React from 'react';
import './auth.scss';


export const RegistrationButton = () => {
    return (
        <button type="button" className="registration-link" onClick={() => {
            window.location.href = '/registration';
        }}>
            新規ユーザー追加
        </button>
    );
};
