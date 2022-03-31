import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Loading from "../../loading/Loading";
import { ReservationUrls } from "../../../utils/reservationUrls";

/*
・施設データ、施設料金データを削除する機能

・施設データを削除すると、施設料金データも自動的に削除されるので、
  APIで削除処理を行うのは施設データのみである。

・キャッシュサーバーの都合上、削除処理後反映されるまで5分程度掛かる。
*/

const DeletePlaceButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  // 削除処理
  const DeletePlace = (place_id) => {
    setLoading(true);
    axios
      .delete(`${ReservationUrls.PLACE}${place_id}/`)
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <>
      <button
        type="button"
        className="approval-btn"
        onClick={() => setIsOpen(true)}
      >
        削除
      </button>
      <Modal
        className="modal-content"
        overlayClassName="modal-overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="modal-wrapper data-list-modal">
          <h2 className="modal-title">施設データ削除</h2>
          <p>
            ・<b>{props.placeName}</b>に関するデータを削除します。
          </p>
          <p>
            ・一度削除すると元に戻せないので、よく確認してから削除してください。
          </p>
          <p>・削除されるデータには、料金データも含まれています。</p>
          <p>・データの削除後、データの反映に5分程度掛かります。</p>
          <div className="btn-wrapper">
            <button
              type="button"
              className="back-btn"
              onClick={() => setIsOpen(false)}
            >
              閉じる
            </button>
            <span className="btn-space"></span>
            <button
              type="button"
              className="approval-btn"
              onClick={() => DeletePlace(props.placeId)}
            >
              削除
            </button>
          </div>
        </div>
        {loading && <Loading />}
      </Modal>
    </>
  );
};

export default DeletePlaceButton;
