import React from "react";
import AddData from "../components/datalist/add/AddData";

export const AddDataPage = () => {
  document.title = "データ追加 | 予約管理アプリ"; // ページタイトルを変更
  return <AddData />;
};
