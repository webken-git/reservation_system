import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import MainPage from './pages/MainPage'
import HeaderRoute from './components/rooter/HeaderRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <HeaderRoute path="/sample" exact children={<Sample/>} /> */}
        <HeaderRoute path ="/" exact children={<MainPage/>}/>
      </Switch>
    </BrowserRouter>
  );
}

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

export default App