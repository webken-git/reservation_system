import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi } from "../components/api/ auth";

const initialState = {
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    }
  }
});

export default slice.reducer;

export const isAuthSelector = state => state.auth.user !== null;

export function login(username, password) {
  return async function(dispatch) {
    const user = await loginApi(username, password);
    dispatch(slice.actions.setUser(user));
  }
}
