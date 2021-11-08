import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Errortest from "../../components/error/Errortest";

export const TopPage = () => {
  useEffect(() => {
    const api = axios
      .get(`${process.env.REACT_APP_LOGIN}/account/auth-user/`)
      .then((res) => {
        console.log(res.data);
      });
    console.log(api);
  }, []);

  return (
    <div>
      <p>TopPage</p>
      {/* <Test/> */}
    </div>
  );
};
