import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const tabState = atom({
  key: "tabState",
  default: {
    placeId: "1",
    placeName: "カーリング場",
    min: 1.0,
    max: 4.0,
  },
  effects_UNSTABLE: [persistAtom],
});

export default tabState;
