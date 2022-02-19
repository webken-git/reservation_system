import React from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import ReservationDeleteForm from "./ReservationDeleteForm";
import ReservationDeleteComplete from "./ReservationDeleteComplete";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";

const ReservationDeleteLayout = () => {
  const unmountRef = useUnmountRef();
  const [modalIsOpen, setModalIsOpen] = useSafeState(unmountRef, false);
  const [showContent, setShowContent] = useSafeState(unmountRef, "input");
  const { getValues, setValue } = useForm();

  // モーダル内のコンテンツを切り替える関数
  const changeState = (state) => setShowContent(state);
  const setStart1 = (start1) => setValue("start1", start1);
  const setStart2 = (start2) => setValue("start2", start2);

  // モーダルの表示状態の変更
  const modalToggle = () => {
    changeState("input");
    setModalIsOpen(!modalIsOpen);
  };

  let ModalContent = null;

  if (showContent === "input") {
    ModalContent = (
      <ReservationDeleteForm
        changeState={changeState}
        setStart1={setStart1}
        setStart2={setStart2}
        modalToggle={modalToggle}
      />
    );
  } else if (showContent === "complete") {
    ModalContent = (
      <ReservationDeleteComplete
        changeState={changeState}
        getStart1={getValues("start1")}
        getStart2={getValues("start2")}
        modalToggle={modalToggle}
      />
    );
  }

  return (
    <>
      <button onClick={modalToggle} className="modal-open-btn">
        予約削除
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

export default ReservationDeleteLayout;
