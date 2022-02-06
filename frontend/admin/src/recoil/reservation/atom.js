import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "select-data",
  storage: typeof window !== "undefined" ? window.localStorage : null,
});

const reseravationData = atom({
  key: "reseravationData",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default reseravationData;
