import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    setLineWidth: (state, action) => {
      const { widgetId, lineWidth } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        lineWidth: lineWidth,
      };
    },
    setLineHeight: (state, action) => {
      const { widgetId, lineHeight } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        lineHeight: lineHeight,
      };
    },
    setLineColor: (state, action) => {
      const { widgetId, lineColor } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        lineColor: lineColor,
      };
    },
    setLineRotation: (state, action) => {
      const { widgetId, lineRotation } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        lineRotation: lineRotation,
      };
    },
    resetLine: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
    setWidgetStyles:(state,action)=>{
      const { widgetId, widgetStyles } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        widgetStyles: widgetStyles,
      };
    },
  },
});

export const {
    setLineWidth, setLineHeight, setLineColor, setLineRotation, 
    resetLine,
    setWidgetStyles,
} = lineSlice.actions;

export default lineSlice.reducer;

