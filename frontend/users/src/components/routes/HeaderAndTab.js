import React from 'react'
import { Route } from  'react-router-dom'
import Header from '../header/Header';
import SelectTab from '../select_tab/SelectTab';
import './headerroute.scss'

const HeaderAndTab = (props) => {
    const children = props.children;
    return(
        <Route
            exact path={children.props.path}
            children={
                <>
                    <div className="allbox">
                        <Header/>
                        <SelectTab/>
                        <div className="mainbox">
                            <div className="contents">
                                {children}
                                {/* ここにページを表示する */}
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    )
}

HeaderAndTab.defaultProps = {

}

export default HeaderAndTab;