import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

const reseravationState = atom({
    key: 'reservationState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export default reseravationState;
