import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const radiobuttonSlice = createSlice({
  name: 'radiobutton',
  initialState,
  reducers: {
    setRadioOptions: (state, action) => {
      const { widgetId, radioOptions } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        radioOptions: radioOptions,
      };
    },
    setRadiodataSource: (state, action) => {
      const { widgetId, radiodataSource } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        radiodataSource: radiodataSource,
      };
    },
    setRadioApiUrl: (state, action) => {
      const { widgetId, radioApiUrl } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        radioApiUrl: radioApiUrl,
      };
    },
    setRadioFontSize: (state, action) => {
      const { widgetId, radioFontSize } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        radioFontSize: radioFontSize,
      };
    },
    setRadioLabel: (state, action) => {
      const { widgetId, radioLabel } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        radioLabel: radioLabel,
      };
    },
    setSelectedRadioOption:(state,action)=>{
        const{widgetId,selectedRadioOption}=action.payload;
        state[widgetId]={
            ...state[widgetId],
        selectedRadioOption:selectedRadioOption,
        }
    },
    resetRadiobutton: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const {
    setRadioOptions,
    setRadiodataSource,
    setRadioApiUrl,
    setRadioFontSize,
    setRadioLabel,
    resetRadiobutton,
    setSelectedRadioOption,
} = radiobuttonSlice.actions;

export default radiobuttonSlice.reducer;

