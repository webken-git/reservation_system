import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import SideBar from './SideBar';

const DrawerMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <>
            <div ref={btnRef} onClick={onOpen} className='fabars'>
                <FontAwesomeIcon icon={faBars} size="2x"/>
            </div>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay>
                    <DrawerContent>
                        {/* <DrawerCloseButton className='close-btn'/> */}
                        <DrawerBody>
                            <div className="sidebar">
                                <SideBar/>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default DrawerMenu;
