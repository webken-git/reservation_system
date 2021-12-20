import React, { useState } from 'react'
import './usericon.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
// import PageLink from '../../pagelink/PageLink';
import { Link } from 'react-router-dom';
import Logout from '../../auth/Logout';

Modal.setAppElement('#root');

const UserIcon = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="user-icon-container">
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" onClick={() => setIsOpen(true)} size="3x" />
            </div>
            {/* <div className='usericonbox' onClick={() => setIsOpen(true)}>
                <div className='circle'></div>
                <p></p>
            </div> */}
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
            >
                <span className="menu-content" onClick={() => setIsOpen(false)}>
                    <Link to='/account' className="menu-link">アカウント</Link>
                </span>
                <span className="menu-content" onClick={() => setIsOpen(false)}>
                    <Logout/>
                </span>
                {/* <PageLink url='/account' pagename={'予約一覧'} /> */}
            </Modal>
        </>
    )
}

export default UserIcon
