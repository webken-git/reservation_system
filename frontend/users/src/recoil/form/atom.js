import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const formData = atom({
  key: "formData",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const formDataId = atom({
  key: "formDataId",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const personalData = atom({
  key: "personalData",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const stepValue = atom({
  key: "stepValue",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
