import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Nav } from 'react-bootstrap';

const UnLogged_in_NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={`${process.env.PUBLIC_URL}/logo192.png`}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"/>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Nav.Link>Sign Up</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default UnLogged_in_NavbarComponent
