import React from "react";
import useAuth from "../../hooks/userAuth";

import HomeUnauthenticated from "./Home_unauthenticated";
import HomeAuthenticated from "./Home_authenticated";

const Home = () => {
    const { isAuthenticated } = useAuth();

    let Home_contents = <HomeUnauthenticated />;

    if (isAuthenticated === true) {
        Home_contents = <HomeAuthenticated />;
    }

    return (
        <div>
            {Home_contents}
        </div>
    );
};

export default Home;
