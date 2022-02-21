import React,{useContext} from 'react'
import { statusContext } from '../../pages/home/Login'
const Errortest = () => {
    const errorState = useContext(statusContext)
    console.log(errorState)
    return (
        <div>
            <h1>test</h1>
            <h2>{errorState}</h2>
        </div>
    )
}

export default Errortest;
