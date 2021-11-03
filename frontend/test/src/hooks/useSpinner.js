import { useSelector, useDispatch } from 'react-redux';
import { selectProgress, selectShow, selectMessage, startProgress, stopProgress } from '../store/spinnerSlice';

function useSpinner() {
    // Sliceで定義したアクションをdispatchで呼び出す
    const dispatch = useDispatch();

    return {
        progress: useSelector(selectProgress),
        show: useSelector(selectShow),
        dialogMessage: useSelector(selectMessage),
        // call action
        startProgress: (dialogMessage) => dispatch(startProgress({ dialogMessage })),
        stopProgress: () => dispatch(stopProgress()),
    };
}

export default useSpinner;
