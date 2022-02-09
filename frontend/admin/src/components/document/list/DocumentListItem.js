import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import { DocumentUrl } from "../../../utils/documentUrls";
import Loading from "../../loading/Loading";
import useUnmountRef from "../../../hooks/useUnmountRef";
import useSafeState from "../../../hooks/useSafeState";
import "../document.scss";

const DocumentListItem = (props) => {
  const unmountRef = useUnmountRef();
  const [showPopup, setShowPopup] = useSafeState(unmountRef, false);
  const [loading, setLoading] = useSafeState(unmountRef, false);

  const copyTextToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // ポップアップを表示
        setShowPopup(true);
        // 2秒後にポップアップを消す
        setTimeout(() => {
          // setPopup("");
          setShowPopup(false);
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      });
  };

  // docxファイルをダウンロードする
  const downloadDocument = (url, file_name) => {
    const link = document.createElement("a");
    // ファイルのリンク先を設定
    link.href = url;
    // ファイル名を設定（なぜか上手くいってない）
    link.download = file_name;
    // ダウンロードを実行
    link.click();
  };

  const delete_DocumentUrl = DocumentUrl.DOCUMENT;
  const deleteDocument = (id) => {
    setLoading(true);
    axios
      .delete(delete_DocumentUrl + id)
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        console.log(err.res.data);
      });
  };

  return (
    <>
      <tr>
        <td>{props.document.number}</td>
        <td>
          {props.document.file_name}
          <div className="copy">
            <button
              className="copy-btn"
              onClick={() => copyTextToClipboard(props.document.file_name)}
            >
              <FontAwesomeIcon
                icon={faCopy}
                size="2x"
                fixedWidth
                className="icon"
              />
            </button>
            <span style={{ display: showPopup ? "table-cell" : "none" }}>
              Copied!
            </span>
          </div>
        </td>
        <td>
          <button
            type="button"
            className="download-btn"
            onClick={() =>
              downloadDocument(
                `${process.env.REACT_APP_DOCUMENT_URL}/documents/docx/` +
                  props.document.file,
                props.document.file_name
              )
            }
          >
            ダウンロード
          </button>
        </td>
        <td>
          <button
            type="button"
            className="delete-btn"
            onClick={() => deleteDocument(props.document.id)}
          >
            削除
          </button>
        </td>
      </tr>
      {loading && <Loading />}
    </>
  );
};

export default DocumentListItem;
