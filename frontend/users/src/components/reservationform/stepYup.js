import * as Yup from "yup";
export const stepSchema = Yup.object().shape({
  group_name: Yup.string().required("必須事項です"),
  reader_name: Yup.string().required("必須事項です"),
  contact_name: Yup.string().required("必須事項です"),
  address: Yup.string().required("必須事項です"),
  tel: Yup.number().required("必須事項です"),
});
