import React from "react";
import { useParams } from "react-router-dom";
import ReservationCancel from "../components/history/ReservationCancel";

export const ReservationCancelPage = () => {
    let { id, reservationId } = useParams();
    return <ReservationCancel id={id} reservationId={reservationId} />;
};
