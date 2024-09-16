import { createSlice } from '@reduxjs/toolkit';

const initialState = {formInputs: []};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormSubmitUrl: (state, action) => {
      const { widgetId, formSubmitUrl } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        formSubmitUrl: formSubmitUrl,
      };
    },
    setFormInputs: (state, action) => {
      const { widgetId, formInputs } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        formInputs: formInputs,
      };
    },
    // setRadioApiUrl: (state, action) => {
    //   const { widgetId, radioApiUrl } = action.payload;
    //   state[widgetId] = {
    //     ...state[widgetId],
    //     radioApiUrl: radioApiUrl,
    //   };
    // },
    // setRadioFontSize: (state, action) => {
    //   const { widgetId, radioFontSize } = action.payload;
    //   state[widgetId] = {
    //     ...state[widgetId],
    //     radioFontSize: radioFontSize,
    //   };
    // },
    // setRadioLabel: (state, action) => {
    //   const { widgetId, radioLabel } = action.payload;
    //   state[widgetId] = {
    //     ...state[widgetId],
    //     radioLabel: radioLabel,
    //   };
    // },
    // setSelectedRadioOption:(state,action)=>{
    //     const{widgetId,selectedRadioOption}=action.payload;
    //     state[widgetId]={
    //         ...state[widgetId],
    //     selectedRadioOption:selectedRadioOption,
    //     }
    // },
    // resetRadiobutton: (state, action) => {
    //   const { widgetId } = action.payload;
    //   state[widgetId] = {};
    // },
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
    setFormSubmitUrl,
    setFormInputs,
    setWidgetStyles,
} = formSlice.actions;

export default formSlice.reducer;

