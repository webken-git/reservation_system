import React from 'react';
import './cart.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { formData } from "../../../recoil/form/atom";



const Cart = (props) => {
    const formDataState = useRecoilValue(formData);
    // 追加した商品の数をカウント
    let count = formDataState.length;
    return (
        <div className='cart-icon-container'>
            <Link to='/cart'>
                <FontAwesomeIcon icon={props.icon} size='2x' className='cart-icon' />
            </Link>
            <span className='cart-count'>{count}</span>
        </div>
    )
}

export default Cart
