import React, { useState } from "react";
import "./cart.scss";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { formData } from "../../../recoil/form/atom";
import PageLink from "../../pagelink/PageLink";
import { useRecoilState } from "recoil";
import { popupState } from "../../../recoil/form/atom";

const Cart = (props) => {
  const formDataState = useRecoilValue(formData);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useRecoilState(popupState);

  // 追加した商品の数をカウント
  let count = formDataState.length;
  return (
    <div className="cart-icon-container">
      <span className="cart-count">{count}</span>
      <FontAwesomeIcon
        icon={props.icon}
        size="2x"
        className="cart-icon"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <span>
          現在<b>{count}</b>件の予約が追加されています。
        </span>
        <span onClick={() => setIsOpen(false)}>
          <PageLink url="/additional-data" pagename={"予約する"} />
        </span>
      </Modal>
      <Modal
        className="popup-modal"
        overlayClassName="popup-overlay"
        isOpen={popup.isOpen}
        onRequestClose={() => setPopup({ isOpen: false, message: "" })}
      >
        <span>{popup.message}</span>
      </Modal>
    </div>
  );
};

export default Cart;
