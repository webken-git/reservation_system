import React from 'react'
import { Route } from  'react-router-dom'
import Header from '../header/Header'
import SideBar from '../sidebar/SideBar'
import './mypage.scss'

const SideBarAndHeaderRoute = (props) => {
    const children = props.children;

    return(
        <Route
            exact path={children.props.path}
            children={
                <div className="allbox">
                    <div className="sidebar">
                    <SideBar/>
                    </div>
                    <div className="mainbox">
                    <Header/>
                    {children}
                    </div>
                </div>
            }
        />
    )
}

SideBarAndHeaderRoute.defaultProps = {

}

export default SideBarAndHeaderRoute;