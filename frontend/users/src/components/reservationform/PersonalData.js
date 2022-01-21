import React from "react";
import { personalData } from "../../recoil/form/atom";
import { useRecoilState, useRecoilValue } from "recoil";
export const PersonalData = () => {
  const data = useRecoilValue(personalData);
  console.log(data);
  return (
    <div>
      <div>
        <p>登録情報</p>
        <p>団体名{data.group_name}</p>
        <p>代表者名{data.reader_name}</p>
        <p>連絡者名{data.contact_name}</p>
        <p>住所{data.address}</p>
        <p>電話番号{data.tel}</p>
      </div>
    </div>
  );
};
