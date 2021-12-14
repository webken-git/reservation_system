// React Routerによるルーティング及び、各コンポーネントをレンダリングする最上位コンポーネント

// 基本インポート
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Axios from 'axios';

// Redux関連のインポート
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

// 各ページのコンポーネント
import LoginPage from './components/user/loginpage';

export const store = createStore(reducer);

// 各ページへのルーティング及びレンダリング指示
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={LoginPage}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
