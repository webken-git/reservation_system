import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";

const ReservationDeleteComplete = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const deleteReservationData = () => {
    //   フォームデータを取得
    const formData = new FormData();
    formData.append("start1", props.getStart1);
    formData.append("start2", props.getStart2);
    axios
      .delete(ReservationUrls.RESERVATION_DELETE, { data: formData })
      .then((res) => {
        setMessage("指定された条件に一致するデータを全て削除しました。");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setError(
            "指定された条件ではデータを削除できませんでした。指定された条件に一致する予約データが存在しない可能性があります。"
          );
        } else {
          setError("予約データの削除に失敗しました。");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    deleteReservationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="document-preparation">
      <div className="document-preparation__header">
        <h3 className="document-preparation__title">
          {message !== null ? message : null}
        </h3>
        {error && <p className="error">{error}</p>}
      </div>
      <br />
      <button
        onClick={() => {
          props.modalToggle();
          window.location.reload();
        }}
        type="button"
        className="modal-close-btn"
      >
        閉じる
      </button>
    </div>
  );
};

export default ReservationDeleteComplete;
