import React, { useState, useEffect } from "react";
import { noWait } from "recoil";
import './feelist.scss'

const FeeList = (props) => {
  const agedata = props.age
  const feelistdata = props.feelist
  const placename = props.placename

  // 小学生から一般まで
  const divide_age = agedata.slice(1, 6)

  // 個人の料金
  const isgroup_false = feelistdata.filter(fld => {
    return fld['is_group'] === false
  })

  // 個人の料金を時間別に分けている
  const from9 = isgroup_false.filter((fld) => {
    return fld['time']['name'] === '午前（09時〜13時）'
  })

  const from10 = isgroup_false.filter((fld) => {
    return fld['time']['name'] === '午前（10時〜13時）'
  })

  const from13 = isgroup_false.filter((fld) => {
    return fld['time']['name'] === '午後（13時〜17時）'
  })

  const from17 = isgroup_false.filter((fld) => {
    return fld['time']['name'] === '夜間（17時〜21時）'
  })

  // 団体の料金
  const isgroup_true = feelistdata.filter(fld => {
    return fld['is_group'] === true
  })

  // 団体利用の一般の料金
  const general = isgroup_true.filter((fld) => {
    return fld['purpose'] === '一般使用'
  })

  // 団体利用で一般の時間別
  const generalFrom9 = general.filter((fld) => {
    return fld['time']['name'] === '午前（09時〜13時）'
  })

  const generalFrom13 = general.filter((fld) => {
    return fld['time']['name'] === '午後（13時〜17時）'
  })

  const generalFrom17 = general.filter((fld) => {
    return fld['time']['name'] === '夜間（17時〜21時）'
  })

  // 団体の競技会の料金
  const competition = isgroup_true.filter((fld) => {
    return fld['purpose'] === '競技会使用'
  })

  // 団体利用で競技会の時間別
  const competitionFrom9 = competition.filter((fld) => {
    return fld['time']['name'] === '午前（09時〜13時）'
  })

  const competitionFrom13 = competition.filter((fld) => {
    return fld['time']['name'] === '午後（13時〜17時）'
  })

  const competitionFrom17 = competition.filter((fld) => {
    return fld['time']['name'] === '夜間（17時〜21時）'
  })

  // 団体利用で営利目的の料金
  const commercial = isgroup_true.filter((fld) => {
    return fld['purpose'].indexOf('一般使用') && fld['purpose'].indexOf('競技会使用')
  })

  //団体利用で営利目的で入場料ありのとき
  const commercialAvailable = commercial.filter((fld) => {
    return fld['purpose'] === '営利目的使用（入場料あり）'
  })

  // 団体利用で営利目的で入場料なしのとき
  const commercialNotAvailable = commercial.filter((fld) => {
    return fld['purpose'] === '営利目的使用（入場料なし）'
  })

  // 団体利用の営利目的(入場料あり)で時間別
  const commercialAvailableFrom9 = commercialAvailable.filter((fld) => {
    return fld['time']['name'] === '午前（09時〜13時）'
  })

  const commercialAvailableFrom13 = commercialAvailable.filter((fld) => {
    return fld['time']['name'] === '午後（13時〜17時）'
  })

  const commercialAvailableFrom17 = commercialAvailable.filter((fld) => {
    return fld['time']['name'] === '夜間（17時〜21時）'
  })

  // 団体利用の営利目的(入場料なし)で時間別
  const commercialNotAvailableFrom9 = commercialNotAvailable.filter((fld) => {
    return fld['time']['name'] === '午前（09時〜13時）'
  })

  const commercialNotAvailableFrom13 = commercialNotAvailable.filter((fld) => {
    return fld['time']['name'] === '午後（13時〜17時）'
  })

  const commercialNotAvailableFrom17 = commercialNotAvailable.filter((fld) => {
    return fld['time']['name'] === '夜間（17時〜21時）'
  })

  // 表で利用する年齢
  const agelists = divide_age.map((ages, ageid) => {
    return (
      <th key={ageid}>{ages.name}</th>
    )
  })

  const IndividualFeeList = () => {
    const individualfee_from9 = from9.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const individualfee_from10 = from10.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const individualfee_from13 = from13.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const individualfee_from17 = from17.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const Curling = () => {
      return (
        <div>
          <h3>個人</h3>
          <table>
            <tr>
              <th></th>
              {agelists}
            </tr>
            <tr>
              {/* 10時から  */}
              <th>午前（10時〜13時）</th>
              {individualfee_from10}
            </tr>
            <tr>
              {/* 13時から  */}
              <th>午後（13時〜17時）</th>
              {individualfee_from13}
            </tr>
            <tr>
              {/* 17時から  */}
              <th>夜間（17時〜21時）</th>
              {individualfee_from17}
            </tr>
          </table>
        </div>
      )
    }

    const ConferenceRoom = () => {
      return (
        <div>
          <table>
            <tr>
              <th></th>
              <th>一般</th>
            </tr>
            <tr>
              {/* 9時から  */}
              <th>午前（09時〜13時）</th>
              {individualfee_from9}
            </tr>
            <tr>
              {/* 13時から  */}
              <th>午後（13時〜17時）</th>
              {individualfee_from13}
            </tr>
            <tr>
              {/* 17時から  */}
              <th>夜間（17時〜21時）</th>
              {individualfee_from17}
            </tr>
          </table>
        </div>
      )
    }

    const Various = () => {
      return (
        <div>
          <h3>個人</h3>
          <table>
            <tr>
              <th></th>
              {agelists}
            </tr>
            <tr>
              {/* 9時から  */}
              <th>午前（09時〜13時）</th>
              {individualfee_from9}
            </tr>
            <tr>
              {/* 13時から  */}
              <th>午後（13時〜17時）</th>
              {individualfee_from13}
            </tr>
            <tr>
              {/* 17時から  */}
              <th>夜間（17時〜21時）</th>
              {individualfee_from17}
            </tr>
          </table>
        </div>
      )
    }

    function Divide() {
      if (placename === 'カーリング場') {
        return (
          <Curling />
        )
      } else if (placename.indexOf('会議室') > -1) {
        return (
          <ConferenceRoom />
        )
      } else if (placename === 'アーチェリー場') {
        return (
          <Various />
        )
      } else if (placename === '武道場') {
        return (
          <Various />
        )
      } else if (placename === '多目的体育館') {
        return (
          <Various />
        )
      } else {
        return 0
      }
    }

    return (
      <Divide />
    )
  }

  const GroupFeeList = () => {
    const groupFeeGeneral = general.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeCompetition = competition.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeCommercial = commercial.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeGeneralFrom9 = generalFrom9.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeGeneralFrom13 = generalFrom13.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeGeneralFrom17 = generalFrom17.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeCompetitionFrom9 = competitionFrom9.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeCompetitionFrom13 = competitionFrom13.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupFeeCompetitionFrom17 = competitionFrom17.map((fees, feeid) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupCommercialAvailableFrom9 = commercialAvailableFrom9.map((fees) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupCommercialAvailableFrom13 = commercialAvailableFrom13.map((fees) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupCommercialAvailableFrom17 = commercialAvailableFrom17.map((fees) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupCommercialNotAvailableFrom9 = commercialNotAvailableFrom9.map((fees) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupCommercialNotAvailableFrom13 = commercialNotAvailableFrom13.map((fees) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const groupCommercialNotAvailableFrom17 = commercialNotAvailableFrom17.map((fees) => {
      return (
        <td>{fees['fee']}</td>
      )
    })

    const Curling = () => {
      return (
        <div>
          <h3>団体</h3>
          <h4>一般使用</h4>
          <table>
            <tr>
              <th></th>
              {agelists}
            </tr>
            <tr>
              {/* 団体一般  */}
              <th>１シート１時間につき</th>
              {groupFeeGeneral}
            </tr>
          </table>

          <h4>競技会使用</h4>
          <table>
            <tr>
              <th></th>
              {agelists}
            </tr>
            <tr>
              {/* 競技会  */}
              <th>１シート１時間につき</th>
              {groupFeeCompetition}
            </tr>
          </table>

          <h4>営利目的使用</h4>
          <table>
            <tr>
              <th></th>
              <th>入場料あり</th>
              <th>入場料なし</th>
            </tr>
            <tr>
              {/* 営利 */}
              <th>１シート１時間につき</th>
              {groupFeeCommercial}
            </tr>
          </table>
        </div>
      )
    }

    const Various = () => {
      return (
        <div>
          <h3>団体</h3>
          <h4>一般使用</h4>
          <table>
            <tr>
              <th></th>
              {agelists}
            </tr>
            <tr>
              <th>午前（09時〜13時）</th>
              {groupFeeGeneralFrom9}
            </tr>
            <tr>
              <th>午前（13時〜17時）</th>
              {groupFeeGeneralFrom13}
            </tr>
            <tr>
              <th>午前（17時〜21時）</th>
              {groupFeeGeneralFrom17}
            </tr>
          </table>

          <h4>競技会使用</h4>
          <table>
            <tr>
              <th></th>
              {agelists}
            </tr>
            <tr>
              <th>午前（09時〜13時）</th>
              {groupFeeCompetitionFrom9}
            </tr>
            <tr>
              <th>午前（13時〜17時）</th>
              {groupFeeCompetitionFrom13}
            </tr>
            <tr>
              <th>午前（17時〜21時）</th>
              {groupFeeCompetitionFrom17}
            </tr>
          </table>

          <h4>営利目的使用</h4>
          <table>
            <tr>
              <th></th>
              <th>入場あり</th>
              <th>入場料なし</th>
            </tr>
            <tr>
              <th>午前（09時〜13時）</th>
              {groupCommercialAvailableFrom9}
              {groupCommercialNotAvailableFrom9}
            </tr>
            <tr>
              <th>午前（13時〜17時）</th>
              {groupCommercialAvailableFrom13}
              {groupCommercialNotAvailableFrom13}
            </tr>
            <tr>
              <th>午前（17時〜21時）</th>
              {groupCommercialAvailableFrom17}
              {groupCommercialNotAvailableFrom17}
            </tr>
          </table>
        </div>
      )
    }

    function Divide() {
      if (placename === 'カーリング場') {
        return (
          <Curling />
        )
      } else if (placename === 'アーチェリー場') {
        return (
          <Various />
        )
      } else if (placename === '武道場') {
        return (
          <Various />
        )
      } else if (placename === '多目的体育館') {
        return (
          <Various />
        )
      } else {
        return (
          <p></p>
        )
      }
    }

    return (
      <Divide />
    )

  }

  return (
    <div className="feelist">
      <div>
        <div>
          <IndividualFeeList />
          <GroupFeeList />
        </div>
      </div>
    </div>
  )
}

export default FeeList