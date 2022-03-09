import React from "react";
import Loading from "../loading/Loading";
import "./feelist.scss";

const GroupFeeList = (props) => {
  const feelistdata = props.feelist;

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
      feelist.time.name.indexOf("午前") !== -1 &&
      feelist.purpose.indexOf("一般使用") !== -1
  );
  const time5 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午後") !== -1 &&
      feelist.purpose.indexOf("一般使用") !== -1
  );
  const time6 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("夜間") !== -1 &&
      feelist.purpose.indexOf("一般使用") !== -1
  );
  const time7 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午前") !== -1 &&
      feelist.purpose.indexOf("競技会使用") !== -1
  );
  const time8 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午後") !== -1 &&
      feelist.purpose.indexOf("競技会使用") !== -1
  );
  const time9 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("夜間") !== -1 &&
      feelist.purpose.indexOf("競技会使用") !== -1
  );
  const time10 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午前") !== -1 &&
      feelist.purpose.indexOf("入場料あり") !== -1
  );
  const time11 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午後") !== -1 &&
      feelist.purpose.indexOf("入場料あり") !== -1
  );
  const time12 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("夜間") !== -1 &&
      feelist.purpose.indexOf("入場料あり") !== -1
  );
  const time13 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午前") !== -1 &&
      feelist.purpose.indexOf("入場料なし") !== -1
  );
  const time14 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("午後") !== -1 &&
      feelist.purpose.indexOf("入場料なし") !== -1
  );
  const time15 = feelistdata.filter(
    (feelist) =>
      feelist.time.name.indexOf("夜間") !== -1 &&
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
  const fee29 = time6.filter((feelist) => feelist.age.name === "小学生");
  const fee30 = time6.filter((feelist) => feelist.age.name === "中学生");
  const fee31 = time6.filter((feelist) => feelist.age.name === "高校生");
  const fee32 = time6.filter((feelist) => feelist.age.name === "大学生");
  const fee33 = time6.filter((feelist) => feelist.age.name === "一般");
  const fee34 = time7.filter((feelist) => feelist.age.name === "小学生");
  const fee35 = time7.filter((feelist) => feelist.age.name === "中学生");
  const fee36 = time7.filter((feelist) => feelist.age.name === "高校生");
  const fee37 = time7.filter((feelist) => feelist.age.name === "大学生");
  const fee38 = time7.filter((feelist) => feelist.age.name === "一般");
  const fee39 = time8.filter((feelist) => feelist.age.name === "小学生");
  const fee40 = time8.filter((feelist) => feelist.age.name === "中学生");
  const fee41 = time8.filter((feelist) => feelist.age.name === "高校生");
  const fee42 = time8.filter((feelist) => feelist.age.name === "大学生");
  const fee43 = time8.filter((feelist) => feelist.age.name === "一般");
  const fee44 = time9.filter((feelist) => feelist.age.name === "小学生");
  const fee45 = time9.filter((feelist) => feelist.age.name === "中学生");
  const fee46 = time9.filter((feelist) => feelist.age.name === "高校生");
  const fee47 = time9.filter((feelist) => feelist.age.name === "大学生");
  const fee48 = time9.filter((feelist) => feelist.age.name === "一般");
  const fee49 = time10.filter((feelist) => feelist.age.name === "一般");
  const fee50 = time11.filter((feelist) => feelist.age.name === "一般");
  const fee51 = time12.filter((feelist) => feelist.age.name === "一般");
  const fee52 = time13.filter((feelist) => feelist.age.name === "一般");
  const fee53 = time14.filter((feelist) => feelist.age.name === "一般");
  const fee54 = time15.filter((feelist) => feelist.age.name === "一般");

  // 各定数に値が入っているか確認
  if (time1.length === 0 || fee1.length === 0) {
    return <Loading />;
  } else {
    return (
      <div className="feelist group">
        <div>
          <h2>個人使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>小学生</th>
                <th>中学生</th>
                <th>高校生</th>
                <th>大学生</th>
                <th>一般</th>
                <th>高齢者</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time1[0].time.name}</td>
                <td data-label="小学生">{fee1[0].fee}</td>
                <td data-label="中学生">{fee2[0].fee}</td>
                <td data-label="高校生">{fee3[0].fee}</td>
                <td data-label="大学生">{fee4[0].fee}</td>
                <td data-label="一般">{fee5[0].fee}</td>
                <td data-label="高齢者">{fee6[0].fee}</td>
              </tr>
              <tr>
                <td>{time2[0].time.name}</td>
                <td data-label="小学生">{fee7[0].fee}</td>
                <td data-label="中学生">{fee8[0].fee}</td>
                <td data-label="高校生">{fee9[0].fee}</td>
                <td data-label="大学生">{fee10[0].fee}</td>
                <td data-label="一般">{fee11[0].fee}</td>
                <td data-label="高齢者">{fee12[0].fee}</td>
              </tr>
              <tr>
                <td>{time3[0].time.name}</td>
                <td data-label="小学生">{fee13[0].fee}</td>
                <td data-label="中学生">{fee14[0].fee}</td>
                <td data-label="高校生">{fee15[0].fee}</td>
                <td data-label="大学生">{fee16[0].fee}</td>
                <td data-label="一般">{fee17[0].fee}</td>
                <td data-label="高齢者">{fee18[0].fee}</td>
              </tr>
            </tbody>
          </table>
          <h2>団体使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>小学生</th>
                <th>中学生</th>
                <th>高校生</th>
                <th>大学生</th>
                <th>一般</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time4[0].time.name}</td>
                <td data-label="小学生">{fee19[0].fee}</td>
                <td data-label="中学生">{fee20[0].fee}</td>
                <td data-label="高校生">{fee21[0].fee}</td>
                <td data-label="大学生">{fee22[0].fee}</td>
                <td data-label="一般">{fee23[0].fee}</td>
              </tr>
              <tr>
                <td>{time5[0].time.name}</td>
                <td data-label="小学生">{fee24[0].fee}</td>
                <td data-label="中学生">{fee25[0].fee}</td>
                <td data-label="高校生">{fee26[0].fee}</td>
                <td data-label="大学生">{fee27[0].fee}</td>
                <td data-label="一般">{fee28[0].fee}</td>
              </tr>
              <tr>
                <td>{time6[0].time.name}</td>
                <td data-label="小学生">{fee29[0].fee}</td>
                <td data-label="中学生">{fee30[0].fee}</td>
                <td data-label="高校生">{fee31[0].fee}</td>
                <td data-label="大学生">{fee32[0].fee}</td>
                <td data-label="一般">{fee33[0].fee}</td>
              </tr>
            </tbody>
          </table>
          <h2>競技会使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>小学生</th>
                <th>中学生</th>
                <th>高校生</th>
                <th>大学生</th>
                <th>一般</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time7[0].time.name}</td>
                <td data-label="小学生">{fee34[0].fee}</td>
                <td data-label="中学生">{fee35[0].fee}</td>
                <td data-label="高校生">{fee36[0].fee}</td>
                <td data-label="大学生">{fee37[0].fee}</td>
                <td data-label="一般">{fee38[0].fee}</td>
              </tr>
              <tr>
                <td>{time8[0].time.name}</td>
                <td data-label="小学生">{fee39[0].fee}</td>
                <td data-label="中学生">{fee40[0].fee}</td>
                <td data-label="高校生">{fee41[0].fee}</td>
                <td data-label="大学生">{fee42[0].fee}</td>
                <td data-label="一般">{fee43[0].fee}</td>
              </tr>
              <tr>
                <td>{time9[0].time.name}</td>
                <td data-label="小学生">{fee44[0].fee}</td>
                <td data-label="中学生">{fee45[0].fee}</td>
                <td data-label="高校生">{fee46[0].fee}</td>
                <td data-label="大学生">{fee47[0].fee}</td>
                <td data-label="一般">{fee48[0].fee}</td>
              </tr>
            </tbody>
          </table>
          <h2>営利目的使用</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{time10[0].purpose}</th>
                <th>{time11[0].purpose}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{time10[0].time.name}</td>
                <td data-label={time10[0].purpose}>{fee49[0].fee}</td>
                <td data-label={time11[0].purpose}>{fee52[0].fee}</td>
              </tr>
              <tr>
                <td>{time11[0].time.name}</td>
                <td data-label={time10[0].purpose}>{fee50[0].fee}</td>
                <td data-label={time11[0].purpose}>{fee53[0].fee}</td>
              </tr>
              <tr>
                <td>{time12[0].time.name}</td>
                <td data-label={time10[0].purpose}>{fee51[0].fee}</td>
                <td data-label={time11[0].purpose}>{fee54[0].fee}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default GroupFeeList;
