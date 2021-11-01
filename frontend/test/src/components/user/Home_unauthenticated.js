import React from "react";
import { useHistory } from "react-router-dom";

const Home_unauthenticated = () => {
    const history = useHistory();

    return (
        <div>
            <h1>Home</h1>
            <p>
                You are not logged in.
            </p>
            <button onClick={() => history.push("/login")}>
                Login
            </button>
        </div>
    );
};

export default Home_unauthenticated;
