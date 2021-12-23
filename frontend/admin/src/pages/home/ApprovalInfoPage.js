import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import ApprovalInfo from '../../components/approvalInfo/ApprovalInfo'

export const ApprovalInfoPage =()=> {
    const {id} = useParams();

    return (
            <ApprovalInfo
                id={id}
            />
    )
}