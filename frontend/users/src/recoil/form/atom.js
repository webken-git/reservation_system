import { atomFamily, atom } from "recoil";
export const formData = atom({
  key: "formData",
  default: [],
});
export const formDataId = atom({
  key: "formDataId",
  default: [],
});
export const personalData = atom({
  key: " personalData",
  default: [],
});
export const stepValue = atom({
  key: "stepValue",
  default: 0,
});
