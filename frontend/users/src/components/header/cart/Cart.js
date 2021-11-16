import React from 'react'
import './cart.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Cart = (props) => {
    return (
        <div className='cartbox'>
            <p><FontAwesomeIcon icon={props.icon}/></p> 
        </div>
    )
}

export default Cart