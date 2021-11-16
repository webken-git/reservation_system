import React, { useState } from 'react'
import './usericon.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageLink from '../../pagelink/PageLink';

Modal.setAppElement('#root');

const UserIcon = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    
    return (
        <div>
            <div className='usericonbox' onClick={() => setIsOpen(true)}>
                <div className='circle'></div>
                <p><FontAwesomeIcon icon={props.icon}/></p> 
            </div>
            <Modal className='modal' isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
                <PageLink url='/mypage' pagename={'マイページ'}/>
                <PageLink url='/mypage' pagename={'ログアウト'}/>
                <PageLink url='/mypage' pagename={'予約一覧'}/>
            </Modal>
        </div>
    )
}

export default UserIcon