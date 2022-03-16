import React, { useEffect } from "react";
import Loading from "../loading/Loading";
import axios from "axios";
import "./feelist.scss";
import { ReservationUrls } from "../../utils/reservationUrls";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";

const GroupFeeList = (props) => {
  const unmountRef = useUnmountRef();
  const ageData = props.age;
  const feelistData = props.feelist;
  const placeId = props.placeid
  let purposeList = [];
  let timeList = []; // 時間区分を格納する配列
  const [equipmentFeeList, setEquipmentFeeList] = useSafeState(unmountRef, []);

  const age1 = ageData.filter((age) => age.name === "小学生");
  const age2 = ageData.filter((age) => age.name === "中学生");
  const age3 = ageData.filter((age) => age.name === "高校生");
  const age4 = ageData.filter((age) => age.name === "大学生");
  const age5 = ageData.filter((age) => age.name === "一般");
  const age6 = ageData.filter((age) => age.name === "高齢者");
  const age7 = ageData.filter((age) => age.name === "障がい者");

  //用具料金表データの取得
  const GetEquipmentFee = () => {
    axios
      .get(
        `${ReservationUrls.EQUIPMENT_FEE}?equipment__place__id=${placeId}`
      )
      .then((response) => {
        const equipmentFeelists = response.data[0].data;
        setEquipmentFeeList(equipmentFeelists);
      })
      .catch((error) => { });
  }

  useEffect(() => {
    GetEquipmentFee();
  }, []);

  // feelistdataに含まれているpurposeを取得
  feelistData.map((feelist) => {
    return purposeList.push({
      purpose: feelist.purpose
    })
  })
  // purposeListから重複しているデータを削除
  purposeList = purposeList.filter(
    (purpose, index, self) =>
      index === self.findIndex((p) => p.purpose === purpose.purpose)
  )

  const purpose1 = purposeList.filter((purpose) => purpose.purpose === "一般使用")
  const purpose2 = purposeList.filter((purpose) => purpose.purpose === "競技会使用")
  const purpose3 = purposeList.filter((purpose) => purpose.purpose.indexOf("あり") !== -1)
  const purpose4 = purposeList.filter((purpose) => purpose.purpose.indexOf("なし") !== -1)

  // feelistdataに含まれているtimeIdとnameを取得
  feelistData.map((feelist) => {
    return timeList.push({
      timeId: feelist.time.id,
      timeName: feelist.time.name,
    });
  });
  // timeListから重複しているデータを削除
  timeList = timeList.filter(
    (timeId, index, self) =>
      index === self.findIndex((t) => t.timeId === timeId.timeId)
  );

  // 用具料金表
  const Equipment = () => {
    if (equipmentFeeList.length === 0) {
      return <></>
    } else {
      return (
        <>
          <h2>用具</h2>
          <table>
            <tbody>
              {equipmentFeeList.map((equipment, index) => (
                <tr key={equipment.id}>
                  <td>{equipment.equipment.name}</td>
                  <td name={`equipmentfee1-${index}`}>
                    {equipment.fee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
    }
  }

  // リストに値が入っているか確認
  if (age1.length === 0 || timeList === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="feelist">
          <h2>個人使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{age1[0].name}</th>
                <th>{age2[0].name}</th>
                <th>{age3[0].name}</th>
                <th>{age4[0].name}</th>
                <th>{age5[0].name}</th>
                <th>{age6[0].name}</th>
                <th>{age7[0].name}</th>
              </tr>
            </thead>
            <tbody>
              {timeList.map((time, index) => (
                <tr key={time.timeId}>
                  <td>{time.timeName}</td>
                  <td name={`fee1-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age1[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                  <td name={`fee2-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age2[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                  <td name={`fee3-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age3[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                  <td name={`fee4-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age4[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                  <td name={`fee5-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age5[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                  <td name={`fee6-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age6[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                  <td name={`fee7-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age7[0].id &&
                          feelist.is_group === false
                      ).fee
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>団体使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{age1[0].name}</th>
                <th>{age2[0].name}</th>
                <th>{age3[0].name}</th>
                <th>{age4[0].name}</th>
                <th>{age5[0].name}</th>
                <th>{age6[0].name}</th>
                <th>{age7[0].name}</th>
              </tr>
            </thead>
            <tbody>
              {timeList.map((time, index) => (
                <tr key={time.timeId}>
                  <td>{time.timeName}</td>
                  <td name={`groupfee1-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age1[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`groupfee2-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age2[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`groupfee3-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age3[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`groupfee4-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age4[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`groupfee5-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age5[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`groupfee6-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age6[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`groupfee7-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age7[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose1[0].purpose
                      ).fee
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>競技会使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{age1[0].name}</th>
                <th>{age2[0].name}</th>
                <th>{age3[0].name}</th>
                <th>{age4[0].name}</th>
                <th>{age5[0].name}</th>
                <th>{age6[0].name}</th>
                <th>{age7[0].name}</th>
              </tr>
            </thead>
            <tbody>
              {timeList.map((time, index) => (
                <tr key={time.timeId}>
                  <td>{time.timeName}</td>
                  <td name={`competitionfee1-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age1[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`competitionfee2-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age2[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`competitionfee3-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age3[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`competitionfee4-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age4[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`competitionfee5-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age5[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`competitionfee6-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age6[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`competitionfee7-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age7[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose2[0].purpose
                      ).fee
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>営利目的使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{purpose3[0].purpose}</th>
                <th>{purpose4[0].purpose}</th>
              </tr>
            </thead>
            <tbody>
              {timeList.map((time, index) => (
                <tr key={time.timeId}>
                  <td>{time.timeName}</td>
                  <td name={`commercialfee1-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age5[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose3[0].purpose
                      ).fee
                    }
                  </td>
                  <td name={`commercialfee2-${index}`}>
                    {
                      feelistData.find(
                        (feelist) =>
                          feelist.time.id === time.timeId &&
                          feelist.age.id === age5[0].id &&
                          feelist.is_group === true &&
                          feelist.purpose === purpose4[0].purpose
                      ).fee
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Equipment />
        </div>
      </>
    );
  }
};

export default GroupFeeList;
