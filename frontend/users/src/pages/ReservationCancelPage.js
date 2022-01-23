import React from "react";
import { useParams } from "react-router-dom";
import ReservationCancel from "../components/history/ReservationCancel";

export const ReservationCancelPage = () => {
    document.title = "予約キャンセル | 施設予約"; // ページタイトルを変更
    let { id, reservationId } = useParams();
    return <ReservationCancel id={id} reservationId={reservationId} />;
};
