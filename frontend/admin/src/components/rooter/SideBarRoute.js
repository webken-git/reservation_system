import React from 'react'
import {
    Box,
    HStack,
    Stack,
} from "@chakra-ui/react";
import { Route } from 'react-router-dom'
import SideBar from '../sidebar/SideBar'
// import './sideandheader.scss'

// サイドバーとヘッダーを表示するページに使用するルーティング

/* <SideBarAndHeaderRoute/>の使い方
<SideBarAndHeaderRoute pagename="ページの名前(必要なければかかなくてよい)" path="/遷移したいページのファイル名" exact children={<PrivateRoute path="/遷移したいページのファイル名" exact children={<ページ名/>} />} /> */

const SideBarRoute = (props) => {
    const children = props.children;

    return (
        <Route
            exact path={children.props.path}
            children={
                <>
                    <div className="allbox">
                        <Stack >
                            <HStack alignItems="start" className='menu' style={{"merginTop":"0"}}>
                                <Box display={{ base: "none", md: "block" }}>
                                    <div className="sidebar">
                                        <SideBar />
                                    </div>
                                </Box>
                            </HStack>
                        </Stack>
                        <div className="mainbox">
                                {children}
                                {/* ここに承認リストページやカレンダーを表示する */}
                        </div>
                    </div>
                </>
            }
        />
    )
}

SideBarRoute.defaultProps = {

}

export default SideBarRoute;
