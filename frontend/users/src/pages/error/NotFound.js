import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-page">
      <h1 className="error-title">404 Not Found</h1>
      <div className="error-message">
        <p>ご指定のページが見つかりませんでした。</p>
        <p>
          アクセスしようとしたページは削除、変更されたか、現在利用できない可能性があります。
        </p>
        <p>お手数をおかけしますが、以下のリンクよりご利用ください。</p>
      </div>
      <Link to="/">
        <button
          type="button"
          className="btn"
          style={{
            width: "10rem",
          }}
        >
          トップページへ
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
