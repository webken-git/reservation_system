import React from "react";
import { useParams } from "react-router-dom";
import ReservationDetail from "../components/history/ReservationDetail";

export const ReservationDetailPage = () => {
    document.title = "予約詳細 | 施設予約"; // ページタイトルを変更
    let { id } = useParams();
    return <ReservationDetail id={id} />;
};