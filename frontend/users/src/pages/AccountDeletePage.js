import React from "react";
import AccountDelete from "../components/account/AccountDelete";

export const AccountDeletePage = () => {
    document.title = "アカウント削除 | 施設予約"; // ページタイトルを変更
    return <AccountDelete />;
};
