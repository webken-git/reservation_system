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

    // モーダルの表示状態の変更
    const modalToggle = () => {
        changeState("selection");
        setModalIsOpen(!modalIsOpen);
    }

    // 表示するコンポーネントを変更
    let ModalContent = showContent == "selection" && <DocumentSelection changeState={changeState} selectDocument={selectDocument} modalToggle={modalToggle} /> || showContent == "preparation" && <DocumentPreparation changeState={changeState} document={document} modalToggle={modalToggle} />;


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
            </ReactModal>
        </>
    );
};

export default DocumentLayout;
