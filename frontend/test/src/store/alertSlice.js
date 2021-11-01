import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alerts: [],
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        createAlert: (state, action) => {
            return {
                ...state,
                alerts: [...state.alerts, { message: action.payload.message, type: action.payload.type },
                ],
            }
        },
    },
});

export const { createAlert } = alertSlice.actions;

export const selectAlerts = ({ notifications }) => notifications.alerts;

// export Reducer
export default alertSlice.reducer;
