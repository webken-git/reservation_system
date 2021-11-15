import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
    initialState: [],
    reducers: {
        getUserList: (state, action) => {
            return {
                ...state,
                userList: action.payload
            };
        },

        resetUserList: () => {
            return []
        },
      }
});

export const { getUserList, resetUserList } = userSlice.actions;
export const selectUsers = ({ users }) => users;
export default userSlice.reducer;
