import React from "react";
import axios from "axios";
import JSZip from 'jszip';
import saveAs from 'file-saver';
import './document.scss';


import { DocumentUrl } from "../../utils/documentUrl";

const DocumentPreparation = (props) => {
    const [documents, setDocuments] = React.useState([]);

    const post_DocumentUrl = DocumentUrl.DOCUMENT;

    const createDocument = () => {
        try {
            props.document.id.map(async (id) => {
                const response = await axios.post(post_DocumentUrl, { id: id, number: props.document.number, approval_application_id: 2});
                setDocuments([response.data]);
                console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // docxファイルをダウンロードする
    const downloadDocument = (URL) => {
        // const zip = new JSZip();
        // // const docx = zip.folder("docx");
        // documents.map((document) => {
        //     zip.file(`${process.env.REACT_APP_API}/backend/django` + document.file_name, {binary: true});
        // });
        // zip.generateAsync({ type: "blob" }).then(function (content) {
        //     saveAs(content, "document.zip");
        // });
        const link = document.createElement('a');
        link.download = 'document.docx';
        link.href = URL;
        link.click();
    };


    // 戻るボタン押下時、選択画面に戻る
    const returnSelection = () => props.changeState("selection");

    React.useEffect(() => {
        createDocument();
        // downloadDocument();
    }, []);


    return (
        <div className="document-preparation">
            <div className="document-preparation__header">
                <h3 className="document-preparation__title">
                    申請書の発行が完了しました。
                </h3>
            </div>
            <table className="document-preparation-table">
                <tbody>
                {
                    [...documents].map((item) => {
                        return (
                            <tr>
                                <th>第{item.number}号</th>
                                <th>{item.file_name}</th>
                                <th>
                                    <button type="button" className="download-btn" onClick={() => downloadDocument(`${process.env.REACT_APP_DOCUMENT_URL}/` + item.file_name)}>ダウンロード</button>
                                </th>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
            {/* <button type="button" className="back-button" onClick={downloadDocument}>ダウンロード</button> */}
            <button onClick={returnSelection} className="selection-screen-btn">戻る</button>
            <button onClick={props.modalToggle} className="modal-close-btn">閉じる</button>
        </div>
    );
}

export default DocumentPreparation;
