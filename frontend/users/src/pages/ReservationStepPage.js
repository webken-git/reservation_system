import React from "react";
import { ReservationStep } from "../components/reservationform/ReservationStep";

export const ReservationStepPage = () => {
  document.title = "追加した予約一覧 | 施設予約";
  return <ReservationStep />;
}
