import React, { useState, useEffect } from "react";
import { MyPage } from "../../pages/home/MyPage";
import axios from 'axios'
 export const Test = () => {
    const users = {
        email: "websitecreatewak@gmail.com",
        password: "wakhokweb",
    }
     useEffect(() => {
        const get_api = async () => {
            const insert_data = await axios.post(`${process.env.REACT_APP_API}/users/login/`, users)
            try {
                const data = await insert_data.data
                const token = data.access_token
                console.log(token)
            } catch (err) {
                console.log("error")
            }
        }
        get_api()
     }, [])
     return (
         <div>
         </div>
             )
            
}
