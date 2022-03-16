import React, { useEffect } from "react";
import Loading from "../loading/Loading";
import axios from "axios";
import "./feelist.scss";
import { ReservationUrls } from "../../utils/reservationUrls";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";

const FeeList = (props) => {
  const unmountRef = useUnmountRef();
  const ageData = props.age;
  const feelistData = props.feelist;
  const placeId = props.placeid;
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

  // feelistdataに含まれているtimeIdとnameを取得
  feelistData.map((feelist) => {
    return timeList.push({
      timeId: feelist.time.id,
      timeName: feelist.time.name,
    });
  });
  // timeIdListから重複しているデータを削除
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
  if (age1.length === 0 || timeList.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="feelist">
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
          <Equipment />
        </div>
      </>
    );
  }
};

export default FeeList;
