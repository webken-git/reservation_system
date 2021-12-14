import React from 'react'
import { Link } from 'react-router-dom'
import './pagelink.scss'

{/* <PageLink url={'リンクを入力'} namecolor={'文字の色を指定'} pagename={'ページの名前'}/> */}

const PageLink = (props) => {
    return (
        <div>
            <Link to={props.url} className='linkdeco'>
                <p className='pagename' style={{color: props.namecolor}}>{props.pagename}</p>
            </Link>
        </div>
    )
}

export default PageLink