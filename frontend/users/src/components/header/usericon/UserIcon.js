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
        <>
            <div className="user-icon-container">
                <FontAwesomeIcon icon={props.icon} size='3x' className='user-icon' onClick={() => setIsOpen(true)} />
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
        </>
    )
}

export default UserIcon
