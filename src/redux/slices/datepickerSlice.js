// src/redux/slices/dateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      const { widgetId, date } = action.payload;
      // Assuming date is already a string (toISOString) from the action payload
      state[widgetId] = {
        ...state[widgetId],
        selectedDate: date,  // Date should be a string (ISO format)
      };
    },
    resetDate: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const { setDate, resetDate } = dateSlice.actions;

export default dateSlice.reducer;
