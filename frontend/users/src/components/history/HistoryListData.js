import React, { useState, useEffect } from "react";
import { formatDate, formatTime } from "./formatData";
import { Link } from "react-router-dom";
import {
  useSortPlace,
  useSortStartDate,
  useSortStatus,
} from "../../hooks/useSortData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const HistoryListData = (props) => {
  const [sortData, setSortData] = useState(props.data);
  const [sortPlace] = useSortPlace(sortData, setSortData);
  const [sortStartDate] = useSortStartDate(sortData, setSortData);
  const [sortStatus] = useSortStatus(sortData, setSortData);
  // 現在の日時を取得(yyyy-mm-dd hh:mm:ss)
  const now = new Date();

  // 並び替えをリセットする
  const resetSort = () => {
    setSortData(props.data);
  };

  useEffect(() => {
    // 並び替えをリセットする
    resetSort();
  }, [props.data]);

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th className="history-table-thead"></th>
          <th className="history-table-thead__sort" onClick={sortPlace}>
            場所
            <FontAwesomeIcon icon={faSort} className="sort-icon" />
          </th>
          <th className="history-table-thead__sort" onClick={sortStartDate}>
            利用開始日時
            <FontAwesomeIcon icon={faSort} className="sort-icon" />
          </th>
          <th className="history-table-thead__sort" onClick={sortStatus}>
            ステータス
            <FontAwesomeIcon icon={faSort} className="sort-icon" />
          </th>
          <th>詳細</th>
          <th>キャンセル</th>
        </tr>
      </thead>
      <tbody>
        {sortData.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.reservation.leader_name}</td>
            <td data-label="場所">{reservation.reservation.place.name}</td>
            <td data-label="利用開始日時">
              {formatDate(
                new Date(reservation.reservation.start.replace(/-/g, "/"))
              )}{" "}
              {formatTime(
                new Date(reservation.reservation.start.replace(/-/g, "/"))
              )}
            </td>
            <td data-label="ステータス">{reservation.approval.name}</td>
            <td data-label="詳細">
              <Link to={`/history/${reservation.id}`}>
                <button type="button" className="detail-btn">
                  詳細
                </button>
              </Link>
            </td>
            <td data-label="キャンセル">
              <Link
                to={`/history/cancel/${reservation.id}/${reservation.reservation.id}`}
              >
                {
                  // 予約日時の4日以上前の場合のみキャンセルボタンを表示
                  reservation.approval.id === 4 ||
                  new Date(reservation.reservation.start).setDate(
                    new Date(reservation.reservation.start).getDate() - 4
                  ) < now.getTime() ? (
                    <button type="button" className="cancel-btn" disabled>
                      キャンセル
                    </button>
                  ) : (
                    <button type="button" className="cancel-btn">
                      キャンセル
                    </button>
                  )
                }
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryListData;
