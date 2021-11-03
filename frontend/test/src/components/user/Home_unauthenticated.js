import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Jumbotron, Card, ListGroup } from "react-bootstrap";

const Home_unauthenticated = () => {
    const history = useHistory();

    return (
        <div>
            <h1>Home</h1>
            <p>
                あなたはログインしていません。
            </p>
            <button onClick={() => history.push("/login")}>
                ログイン
            </button>
        </div>
    );
};

export default Home_unauthenticated;
