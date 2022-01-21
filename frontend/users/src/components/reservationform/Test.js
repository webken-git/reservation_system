import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formData } from "../../recoil/form/atom";

export const Test = ({ placeName }) => {
  const name = placeName;
  const data = useRecoilValue(formData);
  // console.log(data);
  return (
    <div>
      <p>Test!!</p>
      {data.reservation}
    </div>
  );
};
