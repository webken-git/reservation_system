import React from "react";
import Loading from "../loading/Loading";
import './feelist.scss'

const FeeList = (props) => {
  const agedata = props.age;
  const feelistdata = props.feelist;
  console.log(agedata)

  // 表示する料金データを取得
  const age1 = agedata.filter(age => age.name === "小学生");
  const age2 = agedata.filter(age => age.name === "中学生");
  const age3 = agedata.filter(age => age.name === "高校生");
  const age4 = agedata.filter(age => age.name === "大学生");
  const age5 = agedata.filter(age => age.name === "一般");
  const age6 = agedata.filter(age => age.name === "高齢者");

  // 時間ごとに取得
  const time1 = feelistdata.filter(feelist => feelist.time.name.indexOf("午前") !== -1);
  const time2 = feelistdata.filter(feelist => feelist.time.name.indexOf("午後") !== -1);
  const time3 = feelistdata.filter(feelist => feelist.time.name.indexOf("夜間") !== -1);

  // 時間と年齢で区別
  const fee1 = time1.filter(feelist => feelist.age.name === "小学生");
  const fee2 = time1.filter(feelist => feelist.age.name === "中学生");
  const fee3 = time1.filter(feelist => feelist.age.name === "高校生");
  const fee4 = time1.filter(feelist => feelist.age.name === "大学生");
  const fee5 = time1.filter(feelist => feelist.age.name === "一般");
  const fee6 = time1.filter(feelist => feelist.age.name.indexOf("高") !== -1);
  const fee7 = time2.filter(feelist => feelist.age.name === "小学生");
  const fee8 = time2.filter(feelist => feelist.age.name === "中学生");
  const fee9 = time2.filter(feelist => feelist.age.name === "高校生");
  const fee10 = time2.filter(feelist => feelist.age.name === "大学生");
  const fee11 = time2.filter(feelist => feelist.age.name === "一般");
  const fee12 = time2.filter(feelist => feelist.age.name.indexOf("高") !== -1);
  const fee13 = time3.filter(feelist => feelist.age.name === "小学生");
  const fee14 = time3.filter(feelist => feelist.age.name === "中学生");
  const fee15 = time3.filter(feelist => feelist.age.name === "高校生");
  const fee16 = time3.filter(feelist => feelist.age.name === "大学生");
  const fee17 = time3.filter(feelist => feelist.age.name === "一般");
  const fee18 = time3.filter(feelist => feelist.age.name.indexOf("高") !== -1);


  // 各定数に値が入っているか確認
  if (time1.length === 0 || fee1.length === 0) {
    return <Loading />;
  } else {
    return (
      <div className="feelist">
        <div>
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
                <td data-label={age1[0].name}>{fee1[0].fee}</td>
                <td data-label={age2[0].name}>{fee2[0].fee}</td>
                <td data-label={age3[0].name}>{fee3[0].fee}</td>
                <td data-label={age4[0].name}>{fee4[0].fee}</td>
                <td data-label={age5[0].name}>{fee5[0].fee}</td>
                <td data-label={age6[0].name}>{fee6[0].fee}</td>
              </tr>
              <tr>
                <td>{time2[0].time.name}</td>
                <td data-label={age1[0].name}>{fee7[0].fee}</td>
                <td data-label={age2[0].name}>{fee8[0].fee}</td>
                <td data-label={age3[0].name}>{fee9[0].fee}</td>
                <td data-label={age4[0].name}>{fee10[0].fee}</td>
                <td data-label={age5[0].name}>{fee11[0].fee}</td>
                <td data-label={age6[0].name}>{fee12[0].fee}</td>
              </tr>
              <tr>
                <td>{time3[0].time.name}</td>
                <td data-label={age1[0].name}>{fee13[0].fee}</td>
                <td data-label={age2[0].name}>{fee14[0].fee}</td>
                <td data-label={age3[0].name}>{fee15[0].fee}</td>
                <td data-label={age4[0].name}>{fee16[0].fee}</td>
                <td data-label={age5[0].name}>{fee17[0].fee}</td>
                <td data-label={age6[0].name}>{fee18[0].fee}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FeeList;
