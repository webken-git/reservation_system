import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, loginUser, logoutUser } from '../store/authSlice';

function useAuth() {
    // Sliceで定義したアクションをdispatchで呼び出す
    const dispatch = useDispatch();

    return {
        isAuthenticated: useSelector(selectIsAuthenticated),
        // call action
        loginUser: () => dispatch(loginUser()),
        logoutUser: () => dispatch(logoutUser()),
    };
}

export default useAuth;
