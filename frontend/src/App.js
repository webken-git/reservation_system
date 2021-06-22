import React from "react";
import ReactDOM from 'react-dom';
import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";
import { MyPage } from "./pages/home/MyPage";
import { ApprovalList } from "./pages/home/ApprovalList"
import { DisapprovalList } from "./pages/home/DisapprovalList"
import { UnapprovalList } from "./pages/home/UnapprovalList"
import { BrowserRouter, Switch } from "react-router-dom"
import PrivateRoute from './components/api/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <SideBarAndHeaderRoute path="/mypage" exact children={<PrivateRoute path="/MyPage" exact children={<MyPage/>} />} />
          <SideBarAndHeaderRoute path="/approvalList" exact children={<PrivateRoute path="/ApprovalList" exact children={<ApprovalList/>} />} />
          <SideBarAndHeaderRoute path="/disapprovalList" exact children={<PrivateRoute path="/DisapprovalList" exact children={<DisapprovalList/>} />} />
          <SideBarAndHeaderRoute path="/unapprovalList" exact children={<PrivateRoute path="/UnapprovalList" exact children={<UnapprovalList/>} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
  }
  