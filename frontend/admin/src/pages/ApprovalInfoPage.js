import React from 'react'
import { useParams } from "react-router-dom";
import ApprovalInfo from '../components/approvalInfo/ApprovalInfo'

export const ApprovalInfoPage =()=> {
    const { id } = useParams();
    document.title = '予約管理アプリ | 予約詳細';
    return (
            <ApprovalInfo
                id={id}
            />
    )
}
