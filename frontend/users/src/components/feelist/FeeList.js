import React from "react";
import Loading from "../loading/Loading";
import "./feelist.scss";

const FeeList = (props) => {
  const feelistdata = props.feelist;

  // 表示する料金データを取得
  const time1 = feelistdata.filter(
    (feelist) => feelist.time.name.indexOf("午前") !== -1
  );
  const time2 = feelistdata.filter(
    (feelist) => feelist.time.name.indexOf("午後") !== -1
  );
  const time3 = feelistdata.filter(
    (feelist) => feelist.time.name.indexOf("夜間") !== -1
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
        </div>
      </div>
    );
  }
};

export default FeeList;