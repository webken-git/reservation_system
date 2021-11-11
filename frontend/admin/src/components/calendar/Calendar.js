import React, {useEffect, useState} from "react"
import axios from "axios"
import './calendar.scss'
import Head from './Head';
import Content from './Content';
import DailyContent from './DailyContent';
import Select from './Select';
import MonthlyCalendar from "./MonthlyCalendar";

const Calendar = (props) =>{
    const dayList = ['日', '月', '火', '水', '木', '金', '土'];
    const [ scheduleDict, setScheduleDict ] = useState({});
    const [ dateList, setDateList ] = useState([]); //表示用のリスト
    const date = props.date;
    const [ updateFlag, setUpdateFlag ] = useState(false);
    const [ st, setSt ] = useState(0);
    const [ filterType, setFilterType ] = useState('カーリング場');
    const [ calendarType, setCalendarType ] = useState('weekly');
    
    // 検索する施設名を変数に代入
    const filtering = (e) => {
        setFilterType(e.target.value);
        // console.log(e.target.value);
    }

    useEffect(()=>{
        let unmounted = false;
        let dateDict = {};
        for(let i=0; i<7; i++){
            let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+i);
            dateDict['date'+i] = newDate;
        }
        for(let i=1; i<7; i++){
            let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-i);
            dateDict['mdate'+i] = newDate;
        }
        const sortDateList = () =>{
            let dateList = [];
            for(let day = dateDict['date0'].getDay(); day > 0; day--){
                dateList.push(dateDict['mdate'+day]);
            }
            for(let day = 0; day < (7 - dateDict['date0'].getDay()); day++){
                dateList.push(dateDict['date'+day]);
            }
            if(!unmounted){
                setDateList(dateList);
            }
        }
        sortDateList();

        //現在時刻までスクロール
        let margin = window.innerHeight * 0.02;
        let blockHeight = window.innerHeight * 0.06;
        let now = new Date();
        let hours = now.getHours() - 4;
        let st = now.getHours() < 4 ? 0 : margin + blockHeight * hours;
        if(!unmounted){
            setSt(margin + blockHeight * now.getHours());
        }
        document.getElementsByClassName('content-row')[0].scrollTo({
            top: st,
            left: 0,
            behavior: 'smooth'
          });

        return () => { unmounted = true; }
    }, [date, setCalendarType]);

    // ローディング
    let loadCounter = 0;

    const count = () => {
        loadCounter = loadCounter + 1;
        if(loadCounter >= 14){
            document.getElementById('preloader').classList.add('opacityanime');
            setTimeout(()=>{
                if(document.getElementById('preloader')){
                    document.getElementById('preloader').classList.add('dn');
                }
            }, 200)
        } else {
            document.getElementById('preloader').classList.remove('opacityanime');
            document.getElementById('preloader').classList.remove('dn');
        }
    }

    return (
        <div className="weekly-calendar">
            <div className="header">

                {/* 表示するカレンダーの種類 */}
                <Select
                    calendarType={calendarType}
                    setCalendarType={setCalendarType}
                />

                {/* 表示する予約のフィルター選択 */}
                <div className="filter-base">
                    <p>施設名</p>
                    <select className="filter" onChange={(e) => filtering(e)}>
                        <option value="カーリング場" selected>カーリング場</option>
                        <option value="小会議室">小会議室</option>
                        <option value="中会議室">中会議室</option>
                        <option value="武道場">武道場</option>
                        <option value="多目的体育館">多目的体育館</option>
                    </select>
                </div>

            </div>

            {/* ローディング画面 */}
            <div id="preloader">
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
            </div>

            {calendarType == 'monthly' ? (
                <MonthlyCalendar
                    dayList={dayList}
                    date={date}
                    setCalendarType={setCalendarType}
                    calendarType={calendarType}
                />
            ) : (
                <div className="main">
                    <div className="head-row">
                        <div className="timeline"></div>
                        {calendarType == 'weekly' ? (
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
                                            count={count}
                                        />
                                })
                            ) : (
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
                            )}
                            
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

                        {calendarType == 'weekly' ? (
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
                                            // setFilterType={setFilterType}
                                            filterType={filterType}
                                            setFilterType={setFilterType}
                                            count={count}
                                        />
                            })
                        ) : (
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
                        )}
                    </div>
                </div>
            )}
        </div>
        );
    }

    export default Calendar;