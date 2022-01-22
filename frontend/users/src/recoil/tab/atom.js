import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

const tabState = atom({
    key: 'tabState',
    default: {
        place_id: 1,
    },
    effects_UNSTABLE: [persistAtom],
});

export default tabState;
