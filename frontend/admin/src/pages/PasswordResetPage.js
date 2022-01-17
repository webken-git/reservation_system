import React from "react";
import { useParams } from "react-router-dom";
import PasswordReset from "../components/account/PasswordReset";

export const PasswordResetPage = (match) => {
    // パラメーターを取得
    let { uid, token } = useParams();
    // console.log(uid);
    document.title = "予約管理アプリ | パスワードリセット";
    return <PasswordReset uid={uid} token={token} />;
};
