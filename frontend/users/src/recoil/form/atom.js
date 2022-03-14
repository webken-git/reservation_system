import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "reservation",
  storage: typeof window !== "undefined" ? window.localStorage : null,
});

export const formData = atom({
  key: "formData",
  default: [],
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
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

// 予約データ追加後に表示するポップアップの表示切り替え
export const popupState = atom({
  key: "popupState",
  default: {
    isOpen: false,
    message: "",
  },
  effects_UNSTABLE: [persistAtom],
});
