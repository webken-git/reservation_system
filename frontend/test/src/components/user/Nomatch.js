import React from "react";
import { useHistory } from "react-router-dom";

const Nomatch = () => {
  const history = useHistory();
  return (
    <div>
      <h1>404</h1>
          <p>Page not found</p>
          <button onClick={() => history.push("/")}>
              Go Back Top
          </button>
        </div>
    );
};

export default Nomatch;
