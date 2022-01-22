import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

const tabState = atom({
    key: 'tabState',
    default: {
        placeId: 1,
        placeName: 'カーリング場',
    },
    effects_UNSTABLE: [persistAtom],
});

export default tabState;
