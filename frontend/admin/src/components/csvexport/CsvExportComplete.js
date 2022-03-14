import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";

const CsvExportComplete = (props) => {
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createCsv = () => {
    axios
      .post(ReservationUrls.CSV_EXPORTS, {
        approval: props.getApproval,
        start1: props.getStart1,
        start2: props.getStart2,
      })
      .then((res) => {
        setCsvFile(res.data.path);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setError(
            "指定された条件ではCSVファイルが作成できませんでした。指定された条件に一致する予約データが存在しない可能性があります。"
          );
        } else {
          setError("CSVファイルの作成に失敗しました。");
        }
        setLoading(false);
      });
  };

  // csvファイルをダウンロードする
  const downloadDocument = (url) => {
    const link = document.createElement("a");
    // ファイルのリンク先を設定
    link.href = url;
    // ファイル名を設定（なぜか上手くいってない）
    // link.download = file_name;
    // ダウンロードを実行
    link.click();
  };

  // 戻るボタン押下時、選択画面に戻る
  // const returnSelection = () => props.changeState("selection");

  useEffect(() => {
    createCsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // loadingがtrueならLoadingを表示、falseならフォームを表示
    loading ? (
      <Loading />
    ) : (
      <div className="document-preparation">
        <div className="document-preparation__header">
          <h3 className="document-preparation__title">
            {loading === false &&
              error === null &&
              "CSVファイルを発行しました。"}
          </h3>
          {error && <p className="error">{error}</p>}
        </div>
        {error !== null ? null : (
          <table className="document-preparation-table">
            <thead>
              <tr>
                <th>ダウンロード</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <button
                    type="button"
                    className="download-btn"
                    onClick={() => {
                      downloadDocument(
                        `${process.env.REACT_APP_DOCUMENT_URL}${csvFile}`
                      );
                    }}
                  >
                    ダウンロード
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        )}
        <button onClick={props.modalToggle} className="modal-close-btn">
          閉じる
        </button>
      </div>
    )
  );
};

export default CsvExportComplete;
