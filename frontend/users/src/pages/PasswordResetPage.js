import React from "react";
import { useParams } from "react-router-dom";
import PasswordReset from "../components/account/PasswordReset";

export const PasswordResetPage = () => {
    document.title = "パスワードリセット | 施設予約"; // ページタイトルを変更
    // パラメーターを取得
    let { uid, token } = useParams();
    // console.log(uid);
    return <PasswordReset uid={uid} token={token} />;
};
