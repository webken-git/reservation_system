import React from "react";

import useAuth from "../hooks/useAuth";

import LoggedNavbar from './Logged_in_Navbar'
import UnLoggedNavbar from './UnLogged_in_Navbar'


const NavbarComponent = () => {

    const { isAuthenticated } = useAuth();
    let NavbarContent = <UnLoggedNavbar />

    if (isAuthenticated === true) {
        NavbarContent = <LoggedNavbar />

    }

    return (
        <header>
            {NavbarContent}
        </header>

    )

}

export default NavbarComponent
