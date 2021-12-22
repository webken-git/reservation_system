import React, { useParams, useState } from "react";
import './editdata.scss'
import axios from "axios";
import Modal from 'react-modal'
import { ReservationUrl } from "../../utils/reservationUrls";

Modal.setAppElement('#root');

const EditData = (props) => {
    const [content, setContent] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const feeId = props.feeid

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const editDataSend = (event) => {

        if (content === "") {
            return;
        }

        axios.patch(ReservationUrl.FACILITY_FEE + feeId + '/', {
            id: feeId,
            fee: content
        })
            .then(response => {
                console.log('Success')
            })
            .catch((error) => {
                console.log(error)
            })

        if (content !== "") {
            setContent("")
        }
    }

    return (
        <>
            <span onClick={() => setIsOpen(true)}>{props.tdclick}</span>
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
            >
                <h4>{props.feename}</h4>
                <h4>{props.feetime}</h4>
                <input type="text" value={content} placeholder={props.tdclick} required="required" onChange={handleChange} />
                <button onClick={() => editDataSend()}>変更</button>
                <button onClick={() => setIsOpen(false)}>閉じる</button>
            </Modal>
        </>
    )
}

export default EditData