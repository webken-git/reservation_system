import React from 'react';
import {
    Box,
    HStack,
    Stack,
} from "@chakra-ui/react";
import DrawerMenu from '../sidebar/DrawerMenu';
import './header.scss';
import UserIcon from './usericon/UserIcon';

// ヘッダーはサイドバーのTitleコンポーネントの右横の部分を指す
// ヘッダーの下に承認リストページやユーザーリストページなどが表示される

/* <Header pagename="現在表示しているページの名前"/> */

const Header = (props) => {
    return (
        <div className="headerBox">
            <div className="header">
                <Stack >
                    <HStack p={5} className='drawer-menu'>
                        <Box display={{ base: "block", md: "none" }}>
                            <DrawerMenu />
                        </Box>
                    </HStack>
                </Stack>
                <div className="header_title">{props.pagename}</div>
                {/* 各ページにあった名前に変更できるようにpropsにする */}
                <UserIcon />
            </div>
        </div>
    )
}

export default Header
