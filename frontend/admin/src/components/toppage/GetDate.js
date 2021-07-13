import React from 'react';
import './getdate.scss'

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var week = today.getDay();
var weekJa = new Array("日", "月", "火", "水", "木", "金", "土")

const GetDate = () => {
    return (
        <div className="getdate">
            {year}年{month}月{day}日({weekJa[week]})<span className="getdatespan">の予約表</span>
        </div>
    )
}

export default GetDate