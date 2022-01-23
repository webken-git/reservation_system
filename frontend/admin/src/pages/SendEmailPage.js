import React from "react";
import SendEmail from "../components/mail/SendEmail";

export const SendEmailPage = () => {
    document.title = "予約管理アプリ | メール一斉送信";
    return <SendEmail />;
};
