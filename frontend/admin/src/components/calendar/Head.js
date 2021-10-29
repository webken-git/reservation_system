import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {withCookies} from 'react-cookie'
const Head = (props) =>{
    const [ scheduleList, setScheduleList ] = useState([]);
    const [ contentDate, setContentDate ] = useState(new Date());

    const date = props.date;
    const cookies = props.cookies;
    const individualOrGroup = props.individualOrGroup;
    const setUpdateFlag = props.setUpdateFlag;
    const setHomeUpdateFlag = props.setHomeUpdateFlag;

    useEffect(() => {
        let unmounted = false;
        let year = date.getFullYear();
        let month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();

        axios.get(`${process.env.REACT_APP_API}/reservations/`,{
            params: {
                'start': year+'-'+month+'-'+day,
            }
        })
        .then( res => {
            const scheduleList = res.data;
            if(!unmounted){
                setScheduleList(scheduleList);
                setUpdateFlag(false);
                setHomeUpdateFlag(false);
            }
        })
        .catch( error => {
            console.log(error);
        });

        // if(!unmounted){
        //     setContentDate(new Date(Number(year), Number(month)-1, Number(day)));
        // }

        // if((individualOrGroup === "group")&&(cookies.get('selected-group'))){
        //     axios.get(`${process.env.REACT_APP_END_POINT}/api/v1/groupschedulesearch/`, {
        //         headers: {
        //             'Authorization': `JWT ${cookies.get('schedule-token')}`
        //         },
    
        //         params: {
        //             'date': year+'-'+month+'-'+day,
        //             'groupId': cookies.get('selected-group')
        //         },
        //     })
        //     .then( res => {
        //         const scheduleList = res.data;
        //         if (!unmounted){
        //             setScheduleList(scheduleList);
        //             setUpdateFlag(false);
        //             setHomeUpdateFlag(false);
        //             count();
        //         }
        //     })
        //     .catch( error => {
        //         console.log(error);
        //     });
        // }else{
        //     axios.get(`${process.env.REACT_APP_END_POINT}/api/v1/schedulesearch/`, {
        //         headers: {
        //             'Authorization': `JWT ${cookies.get('schedule-token')}`
        //         },
    
        //         params: {
        //             'date': year+'-'+month+'-'+day
        //         },
        //     })
        //     .then( res => {
        //         const scheduleList = res.data;
        //         if(!unmounted){
        //             setScheduleList(scheduleList);
        //             setUpdateFlag(false);
        //             setHomeUpdateFlag(false);
        //             count();
        //         }
        //     })
        //     .catch( error => {
        //         console.log(error);
        //     });
        // }
        
        return () => { unmounted = true }
    }, [date, individualOrGroup, cookies, setUpdateFlag, setHomeUpdateFlag]);

    //modal
    //グループのスケジュール表示中アラート
    const [isOpen, setIsOpen] = useState(false);
    const [pageX, setPageX] = useState(0);
    const [pageY, setPageY] = useState(0);

    const groupScheduleAlertStyleGenerator = () => ({
        background: 'white',
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '0.3em',
        color: 'black',
        position: 'fixed',
        width: '20vw',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
        top: pageY,
        left: pageX,
        zIndex: '3',
        whiteSpace: 'pre-wrap',
    });

    function modalHandle(event, schedule){
        if(props.individualOrGroup === "individual"){
            let startDate = new Date(Number(schedule.start.substr(0, 4)),
                        Number(schedule.start.substr(5, 2))-1,
                        Number(schedule.start.substr(8, 2)));
            let endDate = new Date(Number(schedule.end.substr(0, 4)),
                        Number(schedule.end.substr(5, 2))-1,
                        Number(schedule.end.substr(8, 2)));
            let scheduleStartDate = "";
            let scheduleEndDate = "";
        
            if(schedule.repeat_interval !== 1){
                if(schedule.repeat_interval === 2){
                    scheduleStartDate = new Date(contentDate.getFullYear(), contentDate.getMonth(), contentDate.getDate());
                    scheduleEndDate = new Date(contentDate.getFullYear(), contentDate.getMonth(), contentDate.getDate());
                }
                else if(schedule.repeat_interval === 3){
                    let startTimeWeekday = contentDate.getDay();
                    let scheduleStartTimeWeekday = startDate.getDay();
                    let scheduleEndTimeWeekday = endDate.getDay();
        
                    scheduleStartDate = new Date(contentDate.getFullYear(), contentDate.getMonth(), contentDate.getDate() - (startTimeWeekday >= scheduleStartTimeWeekday ? (startTimeWeekday - scheduleStartTimeWeekday) : 7 - (scheduleStartTimeWeekday - startTimeWeekday)));
                    scheduleEndDate = new Date(contentDate.getFullYear(), contentDate.getMonth(), contentDate.getDate() + (scheduleEndTimeWeekday >= startTimeWeekday ? (scheduleEndTimeWeekday - startTimeWeekday) : 7 - (startTimeWeekday - scheduleEndTimeWeekday)));
                }
                else if(schedule.repeat_interval === 4){
                    scheduleStartDate = new Date(contentDate.getFullYear(), contentDate.getMonth(), startDate.getDate())
                    scheduleEndDate = new Date(contentDate.getFullYear(), contentDate.getMonth(), endDate.getDate())
                    if(scheduleStartDate > scheduleEndDate){
                        if(contentDate >= scheduleStartDate){
                            scheduleEndDate.setMonth(scheduleEndDate.getMonth()+1);
                        }
                        else{
                            scheduleStartDate.setMonth(scheduleStartDate.getMonth()-1);
                        }
                    }
                }
                else if(schedule.repeat_interval === 5){
                    scheduleStartDate = new Date(contentDate.getFullYear(), startDate.getMonth(), startDate.getDate())
                    scheduleEndDate = new Date(contentDate.getFullYear(), endDate.getMonth(), endDate.getDate())
                    if(scheduleStartDate > scheduleEndDate){
                        if(contentDate >= scheduleStartDate){
                            scheduleEndDate.setMonth(scheduleEndDate.getFullYear()+1);
                        }
                        else{
                            scheduleStartDate.setMonth(scheduleStartDate.getFullYear()-1);
                        }
                    }
                }
                
                props.setScheduleDict({...schedule, "scheduleStartDate": scheduleStartDate, "scheduleEndDate": scheduleEndDate});
            }else{
                props.setScheduleDict({...schedule, "scheduleStartDate": contentDate, "scheduleEndDate": contentDate});
            }
            
            props.openModal();    
        }else{
            setPageX(event.pageX > window.innerWidth * 0.9 ? window.innerWidth * 0.9 : event.pageX);
            setPageY(event.pageY > window.innerHeight * 0.95 ? window.innerHeight * 0.95 : event.pageY);
            setIsOpen(true);
            setTimeout(()=>{
                setIsOpen(false);
            }, 1000);
        }
    }

    return (
        <div className="head">
            <p className="day">{props.day}</p>
            <p className="date"><span className={(new Date(new Date().toDateString()).getTime()===new Date(props.date.toDateString()).getTime() ? "today" : "")}>{props.date.getDate()}</span></p>
            <div className="allday-schedule">
                {scheduleList.map((schedule)=>{
                    return (
                        <div
                            key={"allday-schedule"+schedule.id}
                            className="allday-schedule-content"
                            style={{backgroundColor: schedule.color}}
                            onClick={(e)=>modalHandle(e, schedule)}
                        >
                            {props.individualOrGroup === "individual" && (
                                 <p>{schedule.title}</p>
                            )}
                            {isOpen && (
                                <div style={groupScheduleAlertStyleGenerator()}>
                                    <span>グループのスケジュールを表示中なので編集できません</span>
                                </div>                            
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default withCookies(Head);