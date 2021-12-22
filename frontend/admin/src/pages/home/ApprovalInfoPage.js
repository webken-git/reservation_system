import React, {useState} from 'react'
import ApprovalInfo from '../../components/approvalInfo/ApprovalInfo'

export const ApprovalInfoPage =()=> {

    // const id = window.location.search;
    // const url = new URL(window.location.href);
    // console.log(url)
    // const id = url.get('id')
    // console.log(id)

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    // console.log(param)

    return (
            <ApprovalInfo
                id={id}
            />
    )
}