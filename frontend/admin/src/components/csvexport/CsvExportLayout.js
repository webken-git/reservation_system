import React from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import CsvExportForm from "./CsvExportForm";
import CsvExportComplete from "./CsvExportComplete";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";

const CsvExportLayout = () => {
  const unmountRef = useUnmountRef();
  const [modalIsOpen, setModalIsOpen] = useSafeState(unmountRef, false);
  const [showContent, setShowContent] = useSafeState(unmountRef, "input");
  const { getValues, setValue } = useForm();

  // モーダル内のコンテンツを切り替える関数
  const changeState = (state) => setShowContent(state);
  const setStart1 = (start1) => setValue("start1", start1);
  const setStart2 = (start2) => setValue("start2", start2);
  const setApproval = (approval) => setValue("approval", approval);

  // モーダルの表示状態の変更
  const modalToggle = () => {
    changeState("input");
    setModalIsOpen(!modalIsOpen);
  };

  let ModalContent = null;

  if (showContent === "input") {
    ModalContent = (
      <CsvExportForm
        changeState={changeState}
        setStart1={setStart1}
        setStart2={setStart2}
        setApproval={setApproval}
        modalToggle={modalToggle}
      />
    );
  } else if (showContent === "complete") {
    ModalContent = (
      <CsvExportComplete
        changeState={changeState}
        getStart1={getValues("start1")}
        getStart2={getValues("start2")}
        getApproval={getValues("approval")}
        modalToggle={modalToggle}
      />
    );
  }

  return (
    <>
      <button onClick={modalToggle} className="modal-open-btn">
        CSV出力
      </button>
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

export default CsvExportLayout;
