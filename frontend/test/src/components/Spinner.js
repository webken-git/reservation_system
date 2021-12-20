import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import useSpinner from '../hooks/useSpinner';

// import { useDispatch } from "react-redux";

const SpinnerModal = () => {
    const { show, dialogMessage } = useSpinner();

    // モーダルテスト用
    // const { startProgress, stopProgress, progress, show, dialogMessage, } = useSpinner();
    // const dispatch = useDispatch();
    // dispatch(startProgress("ログイン中"));

    return (
        <Modal show={show} backdrop="static" keyboard={false} className="modal-backdrop">
            <Modal.Header>{dialogMessage}</Modal.Header>
            <Modal.Body>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    )
}

export default SpinnerModal;
