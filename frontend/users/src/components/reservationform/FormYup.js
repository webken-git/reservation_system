import * as Yup from "yup";
export const reservationSchema = Yup.object().shape({
  ageGroup: Yup.boolean().oneOf([true], "選択してください"),
  usage: Yup.string().required("必須事項です"),
  reason: Yup.string()
    .required("必須事項です")
    .min(3, "3文字以上で入力してください"),
});
