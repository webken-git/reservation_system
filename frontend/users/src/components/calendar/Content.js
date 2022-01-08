import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withCookies } from 'react-cookie'
import {v4 as uuidv4} from 'uuid'

import ScheduleBlock from './ScheduleBlock';

const Content = (props) =>{
    const [ scheduleList, setScheduleList ] = useState([]);
    const [ contentDate, setContentDate ] = useState(new Date());
    // const [ stringContentDate, setStringContentDate ] = useState("");
    const date = props.date;
    const cookies = props.cookies;
    const individualOrGroup = props.individualOrGroup;
    const setUpdateFlag = props.setUpdateFlag;
    const setHomeUpdateFlag = props.setHomeUpdateFlag;
    const count = props.count;
    const filterType = props.filterType;
    const setLoading = props.setLoading;
    const approvalFilter = props.approvalFilter;
    const placeName = props.placeName;
    const calendarType = props.calendarType;

    useEffect(() => {
        let unmounted = false;
        let year = date.getFullYear();
        let month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        if(!unmounted){
            setContentDate(new Date(Number(year), Number(month)-1, Number(day)));
        }
        // console.log(year+'-'+month+'-'+day);
        // console.log(placeName);
        axios.get(`${process.env.REACT_APP_API}/api/approval-applications/`,{
            params: {
                'approval': 2,
                'reservation__start': year+'-'+month+'-'+day,
                'reservation__place__name': placeName
            }
        })
        .then(res => {
            const scheduleList = res.data;
            // console.log(scheduleList)
            setLoading(false);
            if(!unmounted){
                setScheduleList(scheduleList);
                setUpdateFlag(false);
                // setHomeUpdateFlag(false);
            }
        })
        .catch( error => {
            console.log(error);
        });
        
        return () => { unmounted = true }
    }, [placeName, date, individualOrGroup, cookies, setUpdateFlag, setHomeUpdateFlag, filterType, count, setLoading, approvalFilter]);

    if (calendarType === 'weekly'){
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
        )} else if (calendarType === 'daily') {
            return (
                <div className="daily-content">
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
}

export default withCookies(Content);