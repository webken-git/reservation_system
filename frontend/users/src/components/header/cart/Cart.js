import React, { useState } from "react";
import "./cart.scss";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { formData } from "../../../recoil/form/atom";
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
        <div className="center">
          <p>
            現在<b>{count}</b>件の予約情報が追加されています。
            <br />
            以下のボタンを押し、予約手続きを進めてください。
          </p>
          <span onClick={() => setIsOpen(false)}>
            <Link to="/reserve">
              <button type="button" className="btn">
                予約する
              </button>
            </Link>
          </span>
        </div>
      </Modal>
      <Modal
        className="popup-modal"
        overlayClassName="popup-overlay"
        isOpen={popup.isOpen}
        onRequestClose={() => setPopup({ isOpen: false, message: "" })}
      >
        <p>{popup.message}</p>
        <p>
          上のアイコンをクリックすることで、予約手続きを進めることができます。
        </p>
      </Modal>
    </div>
  );
};

export default Cart;
