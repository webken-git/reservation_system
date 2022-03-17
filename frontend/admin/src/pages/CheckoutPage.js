import React from "react";
import { ReservationStep } from "../components/reserve/ReservationStep";

export const CheckoutPage = () => {
  document.title = "施設予約 | 予約管理アプリ"; // ページタイトルを変更
  return <ReservationStep />;
};
