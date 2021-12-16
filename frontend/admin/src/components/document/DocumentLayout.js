import React from "react";
import ReactModal from "react-modal";
import './document.scss';

import DocumentSelection from "./DocumentSelection";
import DocumentPreparation from "./DocumentPreparation";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";


const DocumentLayout = () => {
    const unmountRef = useUnmountRef();
    const [modalIsOpen, setModalIsOpen] = useSafeState(unmountRef, false);
    const [showContent, setShowContent] = useSafeState(unmountRef, "selection");
    const [document, setDocument] = useSafeState(unmountRef, []);

    // モーダル内のコンテンツを切り替える関数
    const changeState = (state) => setShowContent(state);
    // 発行する申請書のテンプレートや、発行番号を保存する為の関数
    const selectDocument = (document) => setDocument(document);

    // モーダルの表示状態の変更
    const modalToggle = () => {
        changeState("selection");
        setModalIsOpen(!modalIsOpen);
    }

    let ModalContent = null;

    if (showContent === "selection") {
        ModalContent = <DocumentSelection changeState={changeState} selectDocument={selectDocument} modalToggle={modalToggle}  />;
    } else if (showContent === "preparation") {
        ModalContent = <DocumentPreparation changeState={changeState} document={document} modalToggle={modalToggle} />;
    }

    // 論理演算子を利用し、表示するコンポーネントを変更
    // let ModalContent = showContent === "selection" && <DocumentSelection changeState={changeState} selectDocument={selectDocument} modalToggle={modalToggle} data={data}/> || showContent === "preparation" && <DocumentPreparation changeState={changeState} document={document} modalToggle={modalToggle} data={data}/>;


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
