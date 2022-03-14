import React from "react";
import Loading from "../../loading/Loading";
import EditData from "./EditData";
import "./editfeelist.scss";

const EditCurlingFeeList = (props) => {
  const agedata = props.age;
  const feelistdata = props.feelist;

  // 表示する料金データを取得
  const age1 = agedata.filter((age) => age.name === "小学生");
  const age2 = agedata.filter((age) => age.name === "中学生");
  const age3 = agedata.filter((age) => age.name === "高校生");
  const age4 = agedata.filter((age) => age.name === "大学生");
  const age5 = agedata.filter((age) => age.name === "一般");
  const age6 = agedata.filter((age) => age.name === "高齢者");

  const time1 = feelistdata.filter(
    (feelist) => feelist.time.name.indexOf("午前") !== -1
  );
  const time2 = feelistdata.filter(
    (feelist) => feelist.time.name.indexOf("午後") !== -1
  );
  const time3 = feelistdata.filter(
    (feelist) => feelist.time.name.indexOf("夜間") !== -1
  );
  const time4 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("１時間につき") !== -1 &&
      feelist.purpose.indexOf("一般使用") !== -1
  );
  const time5 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("１時間につき") !== -1 &&
      feelist.purpose.indexOf("競技会使用") !== -1
  );
  const time6 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("１時間につき") !== -1 &&
      feelist.purpose.indexOf("入場料あり") !== -1
  );
  const time7 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("１時間につき") !== -1 &&
      feelist.purpose.indexOf("入場料なし") !== -1
  );

  const fee1 = time1.filter((feelist) => feelist.age.name === "小学生");
  const fee2 = time1.filter((feelist) => feelist.age.name === "中学生");
  const fee3 = time1.filter((feelist) => feelist.age.name === "高校生");
  const fee4 = time1.filter((feelist) => feelist.age.name === "大学生");
  const fee5 = time1.filter((feelist) => feelist.age.name === "一般");
  const fee6 = time1.filter((feelist) => feelist.age.name.indexOf("高") !== -1);
  const fee7 = time2.filter((feelist) => feelist.age.name === "小学生");
  const fee8 = time2.filter((feelist) => feelist.age.name === "中学生");
  const fee9 = time2.filter((feelist) => feelist.age.name === "高校生");
  const fee10 = time2.filter((feelist) => feelist.age.name === "大学生");
  const fee11 = time2.filter((feelist) => feelist.age.name === "一般");
  const fee12 = time2.filter(
    (feelist) => feelist.age.name.indexOf("高") !== -1
  );
  const fee13 = time3.filter((feelist) => feelist.age.name === "小学生");
  const fee14 = time3.filter((feelist) => feelist.age.name === "中学生");
  const fee15 = time3.filter((feelist) => feelist.age.name === "高校生");
  const fee16 = time3.filter((feelist) => feelist.age.name === "大学生");
  const fee17 = time3.filter((feelist) => feelist.age.name === "一般");
  const fee18 = time3.filter(
    (feelist) => feelist.age.name.indexOf("高") !== -1
  );
  const fee19 = time4.filter((feelist) => feelist.age.name === "小学生");
  const fee20 = time4.filter((feelist) => feelist.age.name === "中学生");
  const fee21 = time4.filter((feelist) => feelist.age.name === "高校生");
  const fee22 = time4.filter((feelist) => feelist.age.name === "大学生");
  const fee23 = time4.filter((feelist) => feelist.age.name === "一般");
  const fee24 = time5.filter((feelist) => feelist.age.name === "小学生");
  const fee25 = time5.filter((feelist) => feelist.age.name === "中学生");
  const fee26 = time5.filter((feelist) => feelist.age.name === "高校生");
  const fee27 = time5.filter((feelist) => feelist.age.name === "大学生");
  const fee28 = time5.filter((feelist) => feelist.age.name === "一般");
  const fee29 = time6.filter((feelist) => feelist.age.name === "一般");
  const fee30 = time7.filter((feelist) => feelist.age.name === "一般");

  // 各定数に値が入っているか確認
  if (time1.length === 0 || fee1.length === 0) {
    return <Loading />;
  } else {
    return (
      <div className="editfeelist">
        <div className="feelist-container">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time1[0].time.name}</td>
                <td data-label={age1[0].name}>
                  <EditData
                    feeid={fee1[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time1[0].time.id}
                    feeplaceid={fee1[0].place.id}
                    feeage={age1[0].name}
                    feetime={time1[0].time.name}
                    tdclick={fee1[0].fee}
                  />
                </td>
                <td data-label={age2[0].name}>
                  <EditData
                    feeid={fee2[0].id}
                    feeageid={age2[0].id}
                    feetimeid={time1[0].time.id}
                    feeplaceid={fee2[0].place.id}
                    feeage={age2[0].name}
                    feetime={time1[0].time.name}
                    tdclick={fee2[0].fee}
                  />
                </td>
                <td data-label={age3[0].name}>
                  <EditData
                    feeid={fee3[0].id}
                    feeageid={age3[0].id}
                    feetimeid={time1[0].time.id}
                    feeplaceid={fee3[0].place.id}
                    feeage={age3[0].name}
                    feetime={time1[0].time.name}
                    tdclick={fee3[0].fee}
                  />
                </td>
                <td data-label={age4[0].name}>
                  <EditData
                    feeid={fee4[0].id}
                    feeageid={age4[0].id}
                    feetimeid={time1[0].time.id}
                    feeplaceid={fee4[0].place.id}
                    feeage={age4[0].name}
                    feetime={time1[0].time.name}
                    tdclick={fee4[0].fee}
                  />
                </td>
                <td data-label={age5[0].name}>
                  <EditData
                    feeid={fee5[0].id}
                    feeageid={age5[0].id}
                    feetimeid={time1[0].time.id}
                    feeplaceid={fee5[0].place.id}
                    feeage={age5[0].name}
                    feetime={time1[0].time.name}
                    tdclick={fee5[0].fee}
                  />
                </td>
                <td data-label={age6[0].name}>
                  <EditData
                    feeid={fee6[0].id}
                    feeageid={age6[0].id}
                    feetimeid={time1[0].time.id}
                    feeplaceid={fee6[0].place.id}
                    feeage={age6[0].name}
                    feetime={time1[0].time.name}
                    tdclick={fee6[0].fee}
                  />
                </td>
              </tr>
              <tr>
                <td>{time2[0].time.name}</td>
                <td data-label={age1[0].name}>
                  <EditData
                    feeid={fee7[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time2[0].time.id}
                    feeplaceid={fee7[0].place.id}
                    feeage={age1[0].name}
                    feetime={time2[0].time.name}
                    tdclick={fee7[0].fee}
                  />
                </td>
                <td data-label={age2[0].name}>
                  <EditData
                    feeid={fee8[0].id}
                    feeageid={age2[0].id}
                    feetimeid={time2[0].time.id}
                    feeplaceid={fee8[0].place.id}
                    feeage={age2[0].name}
                    feetime={time2[0].time.name}
                    tdclick={fee8[0].fee}
                  />
                </td>
                <td data-label={age3[0].name}>
                  <EditData
                    feeid={fee9[0].id}
                    feeageid={age3[0].id}
                    feetimeid={time2[0].time.id}
                    feeplaceid={fee9[0].place.id}
                    feeage={age3[0].name}
                    feetime={time2[0].time.name}
                    tdclick={fee9[0].fee}
                  />
                </td>
                <td data-label={age4[0].name}>
                  <EditData
                    feeid={fee10[0].id}
                    feeageid={age4[0].id}
                    feetimeid={time2[0].time.id}
                    feeplaceid={fee10[0].place.id}
                    feeage={age4[0].name}
                    feetime={time2[0].time.name}
                    tdclick={fee10[0].fee}
                  />
                </td>
                <td data-label={age5[0].name}>
                  <EditData
                    feeid={fee11[0].id}
                    feeageid={age5[0].id}
                    feetimeid={time2[0].time.id}
                    feeplaceid={fee11[0].place.id}
                    feeage={age5[0].name}
                    feetime={time2[0].time.name}
                    tdclick={fee11[0].fee}
                  />
                </td>
                <td data-label={age6[0].name}>
                  <EditData
                    feeid={fee12[0].id}
                    feeageid={age6[0].id}
                    feetimeid={time2[0].time.id}
                    feeplaceid={fee12[0].place.id}
                    feeage={age6[0].name}
                    feetime={time2[0].time.name}
                    tdclick={fee12[0].fee}
                  />
                </td>
              </tr>
              <tr>
                <td>{time3[0].time.name}</td>
                <td data-label={age1[0].name}>
                  <EditData
                    feeid={fee13[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time3[0].time.id}
                    feeplaceid={fee13[0].place.id}
                    feeage={age1[0].name}
                    feetime={time3[0].time.name}
                    tdclick={fee13[0].fee}
                  />
                </td>
                <td data-label={age2[0].name}>
                  <EditData
                    feeid={fee14[0].id}
                    feeageid={age2[0].id}
                    feetimeid={time3[0].time.id}
                    feeplaceid={fee14[0].place.id}
                    feeage={age2[0].name}
                    feetime={time3[0].time.name}
                    tdclick={fee14[0].fee}
                  />
                </td>
                <td data-label={age3[0].name}>
                  <EditData
                    feeid={fee15[0].id}
                    feeageid={age3[0].id}
                    feetimeid={time3[0].time.id}
                    feeplaceid={fee15[0].place.id}
                    feeage={age3[0].name}
                    feetime={time3[0].time.name}
                    tdclick={fee15[0].fee}
                  />
                </td>
                <td data-label={age4[0].name}>
                  <EditData
                    feeid={fee16[0].id}
                    feeageid={age4[0].id}
                    feetimeid={time3[0].time.id}
                    feeplaceid={fee16[0].place.id}
                    feeage={age4[0].name}
                    feetime={time3[0].time.name}
                    tdclick={fee16[0].fee}
                  />
                </td>
                <td data-label={age5[0].name}>
                  <EditData
                    feeid={fee17[0].id}
                    feeageid={age5[0].id}
                    feetimeid={time3[0].time.id}
                    feeplaceid={fee17[0].place.id}
                    feeage={age5[0].name}
                    feetime={time3[0].time.name}
                    tdclick={fee17[0].fee}
                  />
                </td>
                <td data-label={age6[0].name}>
                  <EditData
                    feeid={fee18[0].id}
                    feeageid={age6[0].id}
                    feetimeid={time3[0].time.id}
                    feeplaceid={fee18[0].place.id}
                    feeage={age6[0].name}
                    feetime={time3[0].time.name}
                    tdclick={fee18[0].fee}
                  />
                </td>
              </tr>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time4[0].time.name}</td>
                <td data-label={age1[0].name}>
                  <EditData
                    feeid={fee19[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time4[0].time.id}
                    feeplaceid={fee19[0].place.id}
                    feeage={age1[0].name}
                    feetime={time4[0].time.name}
                    tdclick={fee19[0].fee}
                  />
                </td>
                <td data-label={age2[0].name}>
                  <EditData
                    feeid={fee20[0].id}
                    feeageid={age2[0].id}
                    feetimeid={time4[0].time.id}
                    feeplaceid={fee20[0].place.id}
                    feeage={age2[0].name}
                    feetime={time4[0].time.name}
                    tdclick={fee20[0].fee}
                  />
                </td>
                <td data-label={age3[0].name}>
                  <EditData
                    feeid={fee21[0].id}
                    feeageid={age3[0].id}
                    feetimeid={time4[0].time.id}
                    feeplaceid={fee21[0].place.id}
                    feeage={age3[0].name}
                    feetime={time4[0].time.name}
                    tdclick={fee21[0].fee}
                  />
                </td>
                <td data-label={age4[0].name}>
                  <EditData
                    feeid={fee22[0].id}
                    feeageid={age4[0].id}
                    feetimeid={time4[0].time.id}
                    feeplaceid={fee22[0].place.id}
                    feeage={age4[0].name}
                    feetime={time4[0].time.name}
                    tdclick={fee22[0].fee}
                  />
                </td>
                <td data-label={age5[0].name}>
                  <EditData
                    feeid={fee23[0].id}
                    feeageid={age5[0].id}
                    feetimeid={time4[0].time.id}
                    feeplaceid={fee23[0].place.id}
                    feeage={age5[0].name}
                    feetime={time4[0].time.name}
                    tdclick={fee23[0].fee}
                  />
                </td>
              </tr>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time5[0].time.name}</td>
                <td data-label={age1[0].name}>
                  <EditData
                    feeid={fee24[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time5[0].time.id}
                    feeplaceid={fee24[0].place.id}
                    feeage={age1[0].name}
                    feetime={time5[0].time.name}
                    tdclick={fee24[0].fee}
                  />
                </td>
                <td data-label={age2[0].name}>
                  <EditData
                    feeid={fee25[0].id}
                    feeageid={age2[0].id}
                    feetimeid={time5[0].time.id}
                    feeplaceid={fee25[0].place.id}
                    feeage={age2[0].name}
                    feetime={time5[0].time.name}
                    tdclick={fee25[0].fee}
                  />
                </td>
                <td data-label={age3[0].name}>
                  <EditData
                    feeid={fee26[0].id}
                    feeageid={age3[0].id}
                    feetimeid={time5[0].time.id}
                    feeplaceid={fee26[0].place.id}
                    feeage={age3[0].name}
                    feetime={time5[0].time.name}
                    tdclick={fee26[0].fee}
                  />
                </td>
                <td data-label={age4[0].name}>
                  <EditData
                    feeid={fee27[0].id}
                    feeageid={age4[0].id}
                    feetimeid={time5[0].time.id}
                    feeplaceid={fee27[0].place.id}
                    feeage={age4[0].name}
                    feetime={time5[0].time.name}
                    tdclick={fee27[0].fee}
                  />
                </td>
                <td data-label={age5[0].name}>
                  <EditData
                    feeid={fee28[0].id}
                    feeageid={age5[0].id}
                    feetimeid={time5[0].time.id}
                    feeplaceid={fee28[0].place.id}
                    feeage={age5[0].name}
                    feetime={time5[0].time.name}
                    tdclick={fee28[0].fee}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <h2>営利目的使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{time6[0].purpose}</th>
                <th>{time7[0].purpose}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time6[0].time.name}</td>
                <td data-label={time6[0].purpose}>
                  <EditData
                    feeid={fee29[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time6[0].time.id}
                    feeplaceid={fee29[0].place.id}
                    feeage={age1[0].name}
                    feetime={time6[0].time.name}
                    tdclick={fee29[0].fee}
                  />
                </td>
                <td data-label={time7[0].purpose}>
                  <EditData
                    feeid={fee30[0].id}
                    feeageid={age1[0].id}
                    feetimeid={time7[0].time.id}
                    feeplaceid={fee30[0].place.id}
                    feeage={age1[0].name}
                    feetime={time7[0].time.name}
                    tdclick={fee30[0].fee}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default EditCurlingFeeList;
