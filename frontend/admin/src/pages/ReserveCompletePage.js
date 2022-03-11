import React from "react";
import { Link } from "react-router-dom";

export const ReserveCompletePage = () => {
  document.title = "予約手続き完了 | 施設予約";
  return (
    <div className="RL-root reservation-complete">
      <div className="reservation-list">
        <h2 className="title">予約手続き完了</h2>
        <div className="reservation-complete-message">
          <p>予約手続きが完了しました。</p>
          <p>メールを送信しましたので、ご確認ください。</p>
          <p>ご利用いただきありがとうございました。</p>
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
    </div>
  );
};
