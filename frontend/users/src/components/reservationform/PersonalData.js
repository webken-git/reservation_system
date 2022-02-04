import React from "react";
import { personalData } from "../../recoil/form/atom";
import { useRecoilValue } from "recoil";
import "./PersonalData.scss";
export const PersonalData = () => {
  const data = useRecoilValue(personalData);
  return (
    <div>
      <div className="PD-root">
        <div className="PD-title">登録情報：</div>
        <div>団体名：{data.group_name}</div>
        <div>代表者名：{data.reader_name}</div>
        <div>連絡者名：{data.contact_name}</div>
        <div>住所：{data.address}</div>
        <div>電話番号：{data.tel}</div>
        <span className="line"></span>
      </div>
    </div>
  );
};
