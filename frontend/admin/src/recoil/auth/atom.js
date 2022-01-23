import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

const authState = atom({
    key: 'authState',
    default: {
        isAuthenticated: false,
        userId: '',
    },
    effects_UNSTABLE: [persistAtom],
});

export default authState;
