import React from "react";
import axios from "axios";
import { formData, personalData } from "../../recoil/form/atom";
import { useRecoilValue } from "recoil";
export const postAgeCategories = () => {
  const FormData = useRecoilValue(formData);
  console.log(FormData);
  const age = {
    age_id: [2],
    reservation: 1,
  };
  axios
    .get(`${process.env.REACT_APP_API}/api/age-categories/`, { age })
    .then((response) => {
      console.log("response body:", response.data);
      console.log("成功");
    })
    .catch((error) => {});
};
