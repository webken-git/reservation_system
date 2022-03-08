import React from "react";
import { personalData } from "../../recoil/form/atom";
import { useRecoilValue } from "recoil";
import "./PersonalData.scss";
export const PersonalData = () => {
  const data = useRecoilValue(personalData);
  return (
    <div>
      <div className="PD-root">
        <h2 className="PD-title">登録情報</h2>
        <ul>
          <li>
            <label>団体名：</label>
            <span>{data.group_name}</span>
          </li>
          <li>
            <label>代表者名：</label>
            <span>{data.leader_name}</span>
          </li>
          <li>
            <label>連絡者名：</label>
            <span>{data.contact_name}</span>
          </li>
          <li>
            <label>住所：</label>
            <span>{data.address}</span>
          </li>
          <li>
            <label>電話番号：</label>
            <span>{data.tel}</span>
          </li>
        </ul>
        <span className="line"></span>
      </div>
    </div>
  );
};
