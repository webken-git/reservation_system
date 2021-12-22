import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil';


const rootElement = document.getElementById('root')
ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    rootElement
);