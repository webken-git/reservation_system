import React from "react";
import { useParams } from "react-router-dom";
import ReservationDetail from "../components/history/ReservationDetail";

export const ReservationDetailPage = () => {
    let { id } = useParams();
    return <ReservationDetail id={id} />;
};
