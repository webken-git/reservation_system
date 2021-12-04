import React from "react";
import { useParams } from "react-router-dom";
import PasswordReset from "../components/auth/PasswordReset";

export const PasswordResetPage = (match) => {
    // パラメーターを取得
    let { uid, token } = useParams();
    // console.log(uid);
    return <PasswordReset uid={uid} token={token} />;
};
