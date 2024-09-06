import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    setCheckboxState: (state, action) => {
      const { widgetId, label, flag, size, labelFontSize } = action.payload;
      state[widgetId] = {
        label: label || '',
        flag: flag || false,
        size: size || '24px',
        labelFontSize: labelFontSize || '16px',
      };
    },
    resetCheckboxState: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const { setCheckboxState, resetCheckboxState } = checkboxSlice.actions;

export default checkboxSlice.reducer;
