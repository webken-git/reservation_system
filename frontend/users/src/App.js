import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import MainPage from './pages/MainPage'
import HeaderRoute from './components/rooter/HeaderRoute';
import { MyPage } from './pages/MyPage';
import { MailAddressChange } from './pages/MailAddressChange';
import { PassWordChange } from './pages/PassWordChange';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <HeaderRoute path="/sample" exact children={<Sample/>} /> */}
        <HeaderRoute path ="/" exact children={<MainPage/>}/>
        <HeaderRoute path ="/mypage" exact children={<MyPage/>}/>
        <HeaderRoute path ="/mailaddresschange" exact children={<MailAddressChange/>}/>
        <HeaderRoute path ="/passwordchange" exact children={<PassWordChange/>}/>
        {/* <HeaderRoute path ="/mailaddresschange" exact children={<MailAddressChange/>}/> */}
      </Switch>
    </BrowserRouter>
  );
}

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

export default App
