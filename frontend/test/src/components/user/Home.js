import React from "react";
import useAuth from "../../hooks/useAuth";

import HomeUnauthenticated from "./Home_unauthenticated";
import HomeAuthenticated from "./Home_authenticated";
import { Container,Row } from "react-bootstrap";

const Home = () => {
    const { isAuthenticated } = useAuth();

    let Home_contents = <HomeUnauthenticated />;

    if (isAuthenticated === true) {
        Home_contents = <HomeAuthenticated />;
    }

    return (
        <Container fluid className="inner">
            <Row className="justify-content-center">
                {Home_contents}
            </Row>
        </Container>
    );
};

export default Home;
