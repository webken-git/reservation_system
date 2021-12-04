import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withCookies } from 'react-cookie'
import {v4 as uuidv4} from 'uuid'

import ScheduleBlock from './ScheduleBlock';
// import CreateModalComponent from './CreateModalComponent'

const DailyContent = (props) =>{
    const [ scheduleList, setScheduleList ] = useState([]);
    const [ contentDate, setContentDate ] = useState(new Date());
    const [ stringContentDate, setStringContentDate ] = useState("");
    const date = props.date;
    const cookies = props.cookies;
    const individualOrGroup = props.individualOrGroup;
    const setUpdateFlag = props.setUpdateFlag;
    const setHomeUpdateFlag = props.setHomeUpdateFlag;
    const count = props.count;
    const filterType = props.filterType;

    useEffect(() => {
        let unmounted = false;
        let year = date.getFullYear();
        let month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        if(!unmounted){
            setContentDate(new Date(Number(year), Number(month)-1, Number(day)));
            setStringContentDate(year+'-'+month+'-'+day);    
        }
        axios.get(`${process.env.REACT_APP_API}/api/approval-applications/`,{
            params: {
                'reservation__start': year+'-'+month+'-'+day,
                'reservation__place__name': filterType
            }
        })
        .then(res => {
            let scheduleList = res.data;
            setLoading(false);
            // console.log(unmounted);
            if(!unmounted){
                const scheduleList = res.data;
                setScheduleList(scheduleList);
                console.log('daily data:', res.data)
                setUpdateFlag(false);
                setHomeUpdateFlag(false);
                count();
            }
        })
        .catch( error => {
            console.log(error);
        });

        // if((individualOrGroup === "group")&&(cookies.get('selected-group'))){
        //     axios.get(`${process.env.REACT_APP_END_POINT}/api/v1/groupschedules/`, {
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
        //     axios.get(`${process.env.REACT_APP_END_POINT}/api/v1/schedules/`, {
        //         headers: {
        //             'Authorization': `JWT ${cookies.get('schedule-token')}`
        //         },
    
        //         params: {
        //             'date': year+'-'+month+'-'+day
        //         },
        //     })
        //     .then( res => {
                // let scheduleList = res.data;
        //         if(!unmounted){
        //             setScheduleList(scheduleList);
        //             //console.log(scheduleList)
        //             setUpdateFlag(false);
        //             setHomeUpdateFlag(false);
        //             count();
        //         }
        //     })
            // .catch( error => {
            //     console.log(error);
            // });
        // }
        
        return () => { unmounted = true }
    }, [date, individualOrGroup, cookies, setUpdateFlag, setHomeUpdateFlag, filterType, count]);

    return (
        <div className="content">
            <div 
                className="content-span" 
            >
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
                <div className="content-div"></div>
            </div>
            {/* <CreateModalComponent
                stringContentDate={stringContentDate}
                setHomeUpdateFlag={props.setHomeUpdateFlag}
            /> */}
            <div className="schedule-block-column">
            {
                props.isMain ?
                scheduleList.map((schedule, index) => {
                    return (
                        <ScheduleBlock
                            key={uuidv4()}
                            schedule={schedule}
                            index={index}
                            // openModal={props.openModal}
                            setScheduleDict={props.setScheduleDict}
                            contentDate={contentDate}
                            // individualOrGroup={props.individualOrGroup}
                        />
                    )
                })
                :null
            }
            </div>
        </div>
    )
}

export default withCookies(DailyContent);