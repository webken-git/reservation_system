import { useState, useEffect } from "react";
import axios from "axios";
import { ReservationUrls } from "../../utils/reservationUrls";

const CsvExportButton = (props) => {
  const [csvFile, setCsvFile] = useState(null);

  const createCsv = () => {
    axios
      .post(
        ReservationUrls.CSV_EXPORTS,
        {
          approval: props.approval,
        },
      )
        .then((res) => {
            setCsvFile(res.data.path);
        })
      .catch((err) => {
      });
  };

  // csvファイルをダウンロードする
  const downloadDocument = (url) => {
    const link = document.createElement('a');
    // ファイルのリンク先を設定
    link.href = url;
    // ファイル名を設定（なぜか上手くいってない）
    // link.download = file_name;
    // ダウンロードを実行
    link.click();
  };

  useEffect(() => {
      createCsv();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className="btn"
      onClick={() => {
          downloadDocument(`${process.env.REACT_APP_API}/reservation_system/backend/django${csvFile}`);
      }}
    >
      CSV出力
    </button>
  );
}

export default CsvExportButton;
