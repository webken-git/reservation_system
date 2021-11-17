import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import './document.scss';


import { DocumentUrl } from "../../utils/documentUrl";
import Loading from "../loading/Loading";


const DocumentPreparation = (props) => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState("");

    const post_DocumentUrl = DocumentUrl.DOCUMENT;

    // チェックボックスで選択された書類を発行
    const createDocument = () => {
        props.document.id.map(async (id) => {
            axios.post(post_DocumentUrl, {
                id: id,
                number: props.document.number,
                approval_application_id: props.data[0].id,
            })
                .then(res => {
                    setDocuments([res.data]);
                    // setError(err.response.data);
                    // API通信が終わったらloadingをfalseにする
                    setLoading(false);
                })
                .catch(err => {
                    // APIのエラーメッセージをstateに保存
                    setError(err.response.data);
                    // API通信が終わったらloadingをfalseにする
                    setLoading(false);
                });
        });
    };

    // docxファイルをダウンロードする
    const downloadDocument = (url, file_name) => {
        const link = document.createElement('a');
        // ファイルのリンク先を設定
        link.href = url;
        // ファイル名を設定（なぜか上手くいってない）
        link.download = file_name;
        // ダウンロードを実行
        link.click();
    };


    // 戻るボタン押下時、選択画面に戻る
    const returnSelection = () => props.changeState("selection");

    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                // ポップアップを表示
                setPopup("Copied!");
                // 2秒後にポップアップを消す
                setTimeout(() => {
                    setPopup("");
                }, 2000);
            })
            .catch(err => {
                setPopup("Failed to copy!");
                setTimeout(() => {
                    setPopup("");
                }, 2000);
            });
    };

    useEffect(() => {
        createDocument();
    }, []);


    return (
        // loadingがtrueならLoadingを表示、falseならフォームを表示
        loading ? <Loading /> :
        <div className="document-preparation">
            <div className="document-preparation__header">
                <h3 className="document-preparation__title">
                    {/* APIリクエストに成功した場合は発行完了メッセージを表示し、
                    失敗した場合はエラーメッセージを表示する */}
                    {error.length === 0 ?<>申請書の発行が完了しました。</> :<>{error.error}</>}
                </h3>
            </div>
            <table className="document-preparation-table">
                <thead>
                    <tr>
                        <th>発行番号</th>
                        <th>ファイル名</th>
                        <th>ダウンロード</th>
                    </tr>
                </thead>
                <tbody>
                {
                    [...documents].map((item) => {
                        return (
                            <tr key={item.id}>
                                <th>第{item.number}号</th>
                                <th>
                                    {item.file_name}
                                    <button className="copy-btn" onClick={() => copyTextToClipboard(item.file_name)}>
                                        <FontAwesomeIcon icon={faCopy} size="2x" fixedWidth className="icon" />
                                    </button>
                                    {popup.length === 0 ? <></> : <span className="popup">{popup}</span>}
                                </th>
                                <th>
                                    <button type="button" className="download-btn" onClick={() => downloadDocument(`${process.env.REACT_APP_DOCUMENT_URL}/` + item.file, item.file_name)}>ダウンロード</button>
                                </th>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
            <button onClick={returnSelection} className="selection-screen-btn">戻る</button>
            <button onClick={props.modalToggle} className="modal-close-btn">閉じる</button>
        </div>
    );
}

export default DocumentPreparation;
