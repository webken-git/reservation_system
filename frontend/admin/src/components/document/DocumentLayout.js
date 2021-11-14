import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import './document.scss';

import DocumentSelection from "./DocumentSelection";
import DocumentPreparation from "./DocumentPreparation";



const DocumentLayout = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showContent, setShowContent] = useState("selection");
    const [document, setDocument] = useState([]);

    const changeState = (state) => setShowContent(state);

    const selectDocument = (document) => setDocument(document);

    let ModalContent = <DocumentSelection />;

    // 表示するコンポーネントを変更
    if (showContent === "preparation") {
        ModalContent = <DocumentPreparation changeState={changeState} document={document}/>;
    } else if (showContent === "selection") {
        ModalContent = <DocumentSelection changeState={changeState} selectDocument={selectDocument}/>;
    }

    // モーダルの表示状態の変更
    const modalToggle = () => {
        changeState("selection");
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            <button onClick={modalToggle} className="modal-open-btn">書類発行</button>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={modalToggle}
                className="modal-content"
                overlayClassName="modal-overlay"
                ariaHideApp={false}
            >
                {ModalContent}
                <button onClick={modalToggle} className="modal-close-btn">閉じる</button>
            </ReactModal>
        </>
    );
};

export default DocumentLayout;
