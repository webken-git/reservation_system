import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/";
import PrivateRoute from "./components/api/PrivateRoute";
import GuestRoute from "./components/api/GuestRoute";

import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import { MyPage }from "./pages/home/MyPage";
import { ApprovalList } from "./pages/home/ApprovalList";
import { UnapprovalList } from "./pages/home/UnapprovalList";
import { DisapprovalList } from "./pages/home/DisapprovalList";
import { CancelList } from "./pages/home/CancelList";
import { UserList } from "./pages/home/UserList";

function Menu() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      {" "}|{" "}
      <Link to="/mypage">MyPage</Link> 
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
          <GuestRoute path="/approvallist" children={<ApprovalList />} />
          <GuestRoute path="/unapprovallist" children={<UnapprovalList />} />
          <GuestRoute path="/disapprovallist" children={<DisapprovalList />} />
          <GuestRoute path="/cancellist" children={<CancelList />} />
          <GuestRoute path="/userlist" children={<UserList />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
