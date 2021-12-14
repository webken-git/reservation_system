import React,{ useState, useEffect } from "react";

const FeeList = (props) => {
  // const [TimeData, setTimeData] = useState([])
  // const [FeeListData, setFeeListData] = useState([])
  // const [UsageData, setUsadeData] = useState([])
  // const [AgeData, setAgeData] = useState([])

  // useEffect(() => {
  //   const intervals = setInterval(() => {
  //     setTimeData(props.time)
  //     setFeeListData(props.feelist)
  //     setUsadeData(props.usage)
  //     setAgeData(props.age)
  //   }, 2000)

  //   return () => {
  //     clearInterval(intervals)
  //   }
  // }, [])

  // console.log(TimeData)

  const agedata = props.age
  const timedata = props.time
  const usagedata = props.usage
  const feelistdata = props.feelist

  const divide_age = agedata.slice(1, 6)

  const timefrom9 = timedata[0]['name']
  const timefrom10 = timedata[1]['name']
  const timefrom13 = timedata[2]['name']
  const timefrom17 = timedata[3]['name']

    const isgroup_true = feelistdata.filter(fld => {
      return fld['is_group'] === true
    })

    const isgroup_false = feelistdata.filter(fld => {
      return fld['is_group'] === false
    })

    const from9 = isgroup_false.filter((fld) => {
      return fld['time']['name'] === timefrom9
    })

    const from10 = isgroup_false.filter((fld) => {
      return fld['time']['name'] === timefrom10
    })

    const from13 = isgroup_false.filter((fld) => {
      return fld['time']['name'] === timefrom13
    })

    const from17 = isgroup_false.filter((fld) => {
      return fld['time']['name'] === timefrom17
    })

    console.log(from9)
    console.log(from10)
    console.log(from13)
    console.log(from17)

    const IndividualFeeList = () => {

      const agelists = divide_age.map((ages, ageid) => {
        return (
          <th key={ageid}>{ages.name}</th>
        )
      })

      const individualfee_from9 = from9.map((fees, feeid) => {
        return(
          <td>{fees['fee']}</td>
        )
      })

      const individualfee_from10 = from10.map((fees, feeid) => {
        return(
          <td>{fees['fee']}</td>
        )
      })

      const individualfee_from13 = from13.map((fees, feeid) => {
        return(
          <td>{fees['fee']}</td>
        )
      })

      const individualfee_from17 = from17.map((fees, feeid) => {
        return(
          <td>{fees['fee']}</td>
        )
      })

      // const timelists = timedata.map((times, timeid) => {
      //   return (
      //     <tr>
      //       <th key={timeid}>{times.name}</th>
      //       {individualfee_from10}
      //     </tr>
      //   )
      // })

      return (
        <table>
          <tr>
            <th></th>
            {agelists}
          </tr>
          <tr>
            {/* 9時から  */}
          </tr>
          <tr>
            {/* 10時から  */}
          </tr>
          <tr>
            {/* 13時から  */}
          </tr>
          <tr>
            {/* 17時から  */}
          </tr>
        </table>
      )
    }

    return (
      <div>
        <IndividualFeeList/>
      </div>
    )
}

export default FeeList