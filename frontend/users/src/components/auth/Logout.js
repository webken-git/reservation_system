import React from "react";
import axios from "axios";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import authState from "../../recoil/auth";
import tabState from "../../recoil/tab";
import { formData, personalData, stepValue } from "../../recoil/form/atom";
import { AuthUrls } from "../../utils/authUrls";
import "./auth.scss";

const Logout = () => {
  const resetAuth = useResetRecoilState(authState);
  const resetTab = useResetRecoilState(tabState);
  const resetFormData = useResetRecoilState(formData);
  const resetPersonalData = useSetRecoilState(personalData);
  const resetStepValue = useSetRecoilState(stepValue);

  // ログアウト処理
  const url = AuthUrls.LOGOUT;
  const onSubmit = () => {
    axios
      .post(url)
      .then((res) => {
        // ログアウト成功時、authStateをfalseにする
        resetAuth();
        resetTab();
        resetFormData();
        resetPersonalData([]);
        resetStepValue(0);
        window.location.href = "/";
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="logout-container" onClick={onSubmit}>
      {/* <button type="button" className="logout-content" onClick={onSubmit}> */}
      ログアウト
      {/* </button> */}
    </div>
  );
};

export default Logout;
