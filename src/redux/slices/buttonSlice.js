import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    setButtonLabel: (state, action) => {
      const { widgetId, buttonLabel } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        buttonLabel: buttonLabel,
      };
    },
    setOnClickAction: (state, action) => {
      const { widgetId, onClickAction } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        onClickAction: onClickAction,
      };
    },
    setWidgetStyles:(state,action)=>{
      const { widgetId, widgetStyles } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        widgetStyles: widgetStyles,
      };
    },
    resetButton: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const {
  setButtonLabel,
  setOnClickAction,
  resetButton,
  setWidgetStyles,
} = buttonSlice.actions;

export default buttonSlice.reducer;
