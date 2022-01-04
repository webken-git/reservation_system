import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from "react-cookie";


const rootElement = document.getElementById('root')
ReactDOM.render(
    <RecoilRoot>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </RecoilRoot>,
    rootElement
);

