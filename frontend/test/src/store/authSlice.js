import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
    initialState,
    reducers: {
        loginUser: (state) => {
            return {
                ...state,
                isAuthenticated: true,
            };
      },
        logoutUser: (state) => {
            return {
                ...state,
                isAuthenticated: false,
            };
      },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const selectIsAuthenticated = ({ auth }) => auth.isAuthenticated;
export default authSlice.reducer;
