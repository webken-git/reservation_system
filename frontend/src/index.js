import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/";
import PrivateRoute from "./components/api/PrivateRoute";
import GuestRoute from "./components/api/GuestRoute";

import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import MyPage from "./pages/home/MyPage";
import Calendar from "./pages/Calendar";
function Menu() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      {" "}|{" "}
      <Link to="/mypage">MyPage</Link>
      {" "}|{" "}
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact children={<Home />} />
          <GuestRoute path="/login" children={<Login />} />
          <PrivateRoute path="/mypage" children={<MyPage />} />
          <PrivateRoute path="/calendar" children={<Calendar />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
