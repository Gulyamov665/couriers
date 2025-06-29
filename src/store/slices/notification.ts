import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "./types";
import { RootState } from "..";

const initialState: NotificationState = {
  lastOrderId: null,
};

const notification = createSlice({
  name: "notificationState",
  initialState,
  reducers: {
    setLastOrderId: (state, action) => {
      state.lastOrderId = action.payload;
    },
    clearLastOrderId: (state) => {
      state.lastOrderId = null;
    },
  },
});

export const notificationState = (state: RootState) => state.notificationState;
export const { setLastOrderId, clearLastOrderId } = notification.actions;

export default notification.reducer;
