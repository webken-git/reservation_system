import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, loginUser, logoutUser } from '../store/authSlice';

function useAuth() {
    // Sliceで定義したアクションをdispatchで呼び出す
    const dispatch = useDispatch();

    return {
        isAuthenticated: useSelector(selectIsAuthenticated),
        // call action
        login: () => dispatch(loginUser()),
        logout: () => dispatch(logoutUser()),
    };
}

export default useAuth;
