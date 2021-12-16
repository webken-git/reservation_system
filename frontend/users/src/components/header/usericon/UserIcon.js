import React, { useState } from 'react'
import './usericon.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageLink from '../../pagelink/PageLink';
import Logout from '../../auth/Logout';

Modal.setAppElement('#root');

const UserIcon = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className='usericonbox' onClick={() => setIsOpen(true)}>
                <div className='circle'></div>
                <p><FontAwesomeIcon icon={props.icon} /></p>
            </div>
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
            >
                <span onClick={() => setIsOpen(false)}>
                    <PageLink url='/account' pagename={'マイページ'} />
                </span>
                <span onClick={() => setIsOpen(false)}>
                    <PageLink url='/account' pagename={'予約一覧'} />
                </span>
                <span onClick={() => setIsOpen(false)}>
                    <Logout />
                </span>
            </Modal>
        </div>
    )
}

export default UserIcon
