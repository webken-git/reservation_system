import React from "react";
import axios from "axios";
// import JSZip from 'jszip';
// import saveAs from 'file-saver';
import './document.scss';


import { DocumentUrl } from "../../utils/documentUrl";

const DocumentPreparation = (props) => {
    const [documents, setDocuments] = React.useState([]);
    const [error, setError] = React.useState([]);

    const post_DocumentUrl = DocumentUrl.DOCUMENT;

    const createDocument = () => {
        props.document.id.map(async (id) => {
            axios.post(post_DocumentUrl, {
                id: id,
                number: props.document.number,
                approval_application_id: 2,
            })
                .then(res => {
                    setDocuments([res.data]);
                })
                .catch(err => {
                    setError(err.response.data);
                });
        });
    };

    // docxファイルをダウンロードする
    const downloadDocument = (url, file_name) => {
        // const zip = new JSZip();
        // // const docx = zip.folder("docx");
        // documents.map((document) => {
        //     zip.file(`${process.env.REACT_APP_API}/backend/django` + document.file_name, {binary: true});
        // });
        // zip.generateAsync({ type: "blob" }).then(function (content) {
        //     saveAs(content, "document.zip");
        // });
        const link = document.createElement('a');
        link.download = file_name;
        link.href = url;
        link.click();
    };


    // 戻るボタン押下時、選択画面に戻る
    const returnSelection = () => props.changeState("selection");

    React.useEffect(() => {
        createDocument();
    }, []);


    return (
        <div className="document-preparation">
            <div className="document-preparation__header">
                <h3 className="document-preparation__title">
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
                                <th>{item.file_name}</th>
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
