import { useEffect } from "react";
import axios from "axios";

import { DocumentUrl } from "../../../utils/documentUrls";
import DocumentListItem from "./DocumentListItem";
import Loading from "../../loading/Loading";
import useUnmountRef from "../../../hooks/useUnmountRef";
import useSafeState from "../../../hooks/useSafeState";
import '../document.scss';

const DocumentList = (props) => {
    const unmountRef = useUnmountRef();
    const [documents, setDocuments] = useSafeState(unmountRef, []);
    const [loading, setLoading] = useSafeState(unmountRef, true);

    const get_DocumentUrl = DocumentUrl.DOCUMENT;
    const pullDocumentList = async () => {
        try {
            const response = await axios.get(get_DocumentUrl);
            setDocuments(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };


    useEffect(() => {
        pullDocumentList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="scroll_box-wrapper">
                {/* {loading ? <Loading /> : */}
                <div className="scroll_box">
                    <table className="list-body">
                        <thead>
                            <tr>
                                <th>発行番号</th>
                                <th>ファイル名</th>
                                <th>ダウンロード</th>
                                <th>削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((item) => {
                                return (
                                    <DocumentListItem
                                        key={item.id}
                                        document={item}
                                        {...props}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {loading && <Loading />}
        </>
    );
};

export default DocumentList;
