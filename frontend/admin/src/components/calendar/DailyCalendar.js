import React, {useEffect, useState} from "react"
import axios from "axios"
import './calendar.scss'
import Head from './Head';
import DailyContent from './DailyContent';
import Select from './Select';

const DailyCalendar = (props) =>{
    const dayList = ['日', '月', '火', '水', '木', '金', '土'];
    const [ scheduleDict, setScheduleDict ] = useState({});
    // const [ dateList, setDateList ] = useState([]);
    const date = props.date;
    const [ updateFlag, setUpdateFlag ] = useState(false);
    const [ st, setSt ] = useState(0);
    const type = 'day';

    // useEffect(()=>{
    //     let unmounted = false;
    //     let dateDict = {};
    //     for(let i=0; i=2; i++){
    //         let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+i);
    //         dateDict['date'+i] = newDate;
    //     }
    //     for(let i=1; i=3; i++){
    //         let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-i);
    //         dateDict['mdate'+i] = newDate;
    //     }
    //     const sortDateList = () =>{
    //         let dateList = [];
    //         for(let day = dateDict['date0'].getDay(); day > 0; day--){
    //             dateList.push(dateDict['mdate'+day]);
    //         }
    //         for(let day = 0; day < (7 - dateDict['date0'].getDay()); day++){
    //             dateList.push(dateDict['date'+day]);
    //         }
    //         if(!unmounted){
    //             setDateList(dateList);
    //         }
    //     }
    //     sortDateList();

    //     //現在時刻までスクロール
    //     let margin = window.innerHeight * 0.02;
    //     let blockHeight = window.innerHeight * 0.06;
    //     let now = new Date();
    //     let hours = now.getHours() - 4;
    //     let st = now.getHours() < 4 ? 0 : margin + blockHeight * hours;
    //     if(!unmounted){
    //         setSt(margin + blockHeight * now.getHours());
    //     }
    //     document.getElementsByClassName('content-row')[0].scrollTo({
    //         top: st,
    //         left: 0,
    //         behavior: 'smooth'
    //       });

    //     return () => { unmounted = true; }
    // }, [date]);

    return (
            <div className="daily-calendar">
                {/* <div id="preloader">
                    <div className="central">
                        <div className="circle c1"></div>
                        <div className="circle c2"></div>
                        <div className="circle c3"></div>
                        <div className="circle c4"></div>
                        <div className="circle c5"></div>
                        <div className="circle c6"></div>
                        <div className="circle c7"></div>
                        <div className="circle c8"></div>
                        <div className="loading">Loading...</div>
                    </div>
                </div> */}
                <div className="header">
                    <Select
                        type={type}
                    />
                </div>
                <div className="head-row">
                    <div className="timeline"></div>

                    {/* {
                        dateList.map((date, index)=>{
                            return <Head
                                        key={index}
                                        day={dayList[index]}
                                        date={date}
                                        setScheduleDict={setScheduleDict}
                                        // openModal={openModal}
                                        updateFlag={updateFlag}
                                        setUpdateFlag={setUpdateFlag}
                                        isMain={props.isMain}
                                        // individualOrGroup={props.individualOrGroup}
                                        homeUpdateFlag={props.homeUpdateFlag}
                                        setHomeUpdateFlag={props.setHomeUpdateFlag}
                                    />
                        })
                    } */}

                    <Head
                        // key={index}
                        // day={dayList[index]}
                        date={date}
                        setScheduleDict={setScheduleDict}
                        // openModal={openModal}
                        updateFlag={updateFlag}
                        setUpdateFlag={setUpdateFlag}
                        isMain={props.isMain}
                        // individualOrGroup={props.individualOrGroup}
                        homeUpdateFlag={props.homeUpdateFlag}
                        setHomeUpdateFlag={props.setHomeUpdateFlag}
                    />
                    
                </div>
                <div className="content-row">
                    <div className="timeline">
                        <div><p>0</p></div>
                        <div><p>1</p></div>
                        <div><p>2</p></div>
                        <div><p>3</p></div>
                        <div><p>4</p></div>
                        <div><p>5</p></div>
                        <div><p>6</p></div>
                        <div><p>7</p></div>
                        <div><p>8</p></div>
                        <div><p>9</p></div>
                        <div><p>10</p></div>
                        <div><p>11</p></div>
                        <div><p>12</p></div>
                        <div><p>13</p></div>
                        <div><p>14</p></div>
                        <div><p>15</p></div>
                        <div><p>16</p></div>
                        <div><p>17</p></div>
                        <div><p>18</p></div>
                        <div><p>19</p></div>
                        <div><p>20</p></div>
                        <div><p>21</p></div>
                        <div><p>22</p></div>
                        <div><p>23</p></div>
                    </div>
                    {/* {
                        dateList.map((date,index)=>{
                            return <Content
                                        key={index}
                                        date={date}
                                        setScheduleDict={setScheduleDict}
                                        // openModal={openModal}
                                        updateFlag={updateFlag}
                                        setUpdateFlag={setUpdateFlag}
                                        isMain={props.isMain}
                                        // individualOrGroup={props.individualOrGroup}
                                        homeUpdateFlag={props.homeUpdateFlag}
                                        setHomeUpdateFlag={props.setHomeUpdateFlag}
                                    />
                        })
                    } */}
                    <DailyContent
                        // key={index}
                        date={date}
                        setScheduleDict={setScheduleDict}
                        // openModal={openModal}
                        updateFlag={updateFlag}
                        setUpdateFlag={setUpdateFlag}
                        isMain={props.isMain}
                        // individualOrGroup={props.individualOrGroup}
                        homeUpdateFlag={props.homeUpdateFlag}
                        setHomeUpdateFlag={props.setHomeUpdateFlag}
                    />
                </div>
            </div>
        );
    }

    export default DailyCalendar;
