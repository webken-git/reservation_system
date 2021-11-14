import React, { useState } from 'react'
import './usericon.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import UserMenu from './UserMenu';

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
                <UserMenu url='/mypage' pagename={'マイページ'}/>
                <UserMenu url='/mypage' pagename={'ログアウト'}/>
                <UserMenu url='/mypage' pagename={'予約一覧'}/>
            </Modal>
        </div>
    )
}

export default UserIcon