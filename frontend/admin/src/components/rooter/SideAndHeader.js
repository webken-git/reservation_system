import React from 'react'
import { Route } from  'react-router-dom'
import Header from '../header/Header'
import SideBar from '../sidebar/SideBar'
import './sideandheader.scss'

// サイドバーとヘッダーを表示するページに使用するルーティング

{/* <SideBarAndHeaderRoute/>の使い方
<SideBarAndHeaderRoute pagename="ページの名前(必要なければかかなくてよい)" path="/遷移したいページのファイル名" exact children={<PrivateRoute path="/遷移したいページのファイル名" exact children={<ページ名/>} />} /> */}

const SideAndHeader = (props) => {
    const children = props.children;
    const pagename = props.pagename;

    return(
        <Route
            exact path={children.props.path}
            children={
                <>
                    <div className="allbox">
                        <div className="sidebar">
                            <SideBar/>
                        </div>
                        <div className="mainbox">
                            <Header pagename={pagename} />
                            {/* pagenameは承認リストやカレンダーなど、各ページの名前を書く */}
                            <div className="contents">
                                {children}
                                {/* ここに承認リストページやカレンダーを表示する */}
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    )
}

SideAndHeader.defaultProps = {

}

export default SideAndHeader;