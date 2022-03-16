import React from "react";

import DocumentList from "../components/document/list/DocumentList";
import "../components/document/document.scss";

export const DocumentListPage = () => {
  document.title = "ドキュメントリスト | 予約管理アプリ"; // ページタイトルを変更
  return (
    <div className="list-wrapper">
      <DocumentList />
    </div>
  );
};
