import React from 'react'
import './selecttab.scss'
import SelectBox from './SelectBox'
import { faFutbol } from "@fortawesome/free-solid-svg-icons"

const SelectTab = () => {
    return (
        <div className='selecttabbox'>
            <SelectBox url='/curling' icon={faFutbol} pagename="カーリング場"/>
            <SelectBox url='/kendo' icon={faFutbol} pagename="剣道場"/>
            <SelectBox url='/archery' icon={faFutbol} pagename="アーチェリー場"/>
            <SelectBox url='/judo' icon={faFutbol} pagename="柔道場"/>
            <SelectBox url='/conferenceroom' icon={faFutbol} pagename="会議室"/>
            <SelectBox url='athleticfield' icon={faFutbol} pagename="多目的体育館"/>
        </div>
    )
}

export default SelectTab