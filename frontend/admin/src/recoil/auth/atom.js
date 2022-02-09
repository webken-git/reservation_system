import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "authorization",
  storage: typeof window !== "undefined" ? window.localStorage : null,
});

const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    userId: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default authState;
