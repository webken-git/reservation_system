import React from 'react'
import { useParams } from "react-router-dom";
import SuspensionInfo from '../components/approvalInfo/SuspensionInfo'

export const SuspensionInfoPage =()=> {
    const { id } = useParams();
    document.title = '予約管理アプリ | 予約停止詳細';
    return (
            <SuspensionInfo
                id={id}
            />
    )
}
