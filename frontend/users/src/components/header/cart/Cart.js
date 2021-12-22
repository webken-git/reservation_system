import React from 'react'
import './cart.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Cart = (props) => {
    return (
        <div className='cart-icon-container'>
            <FontAwesomeIcon icon={props.icon} size='2x' className='cart-icon' />
        </div>
    )
}

export default Cart
