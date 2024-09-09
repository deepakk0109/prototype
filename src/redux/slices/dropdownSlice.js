import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setDropdownOptions: (state, action) => {
      const { widgetId, options } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        dropdownOptions: options,
      };
    },
    setDropdownSource: (state, action) => {
      const { widgetId, source } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        dropdownSource: source,
      };
    },
    setDropdownUrl: (state, action) => {
      const { widgetId, url } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        dropdownUrl: url,
      };
    },
    setDropdownFontSize: (state, action) => {
      const { widgetId, fontSize } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        dropdownFontSize: fontSize,
      };
    },
    setLabel: (state, action) => {
      const { widgetId, label } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        label: label,
      };
    },
    setWidgetStyles:(state,action)=>{
      const { widgetId, widgetStyles } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        widgetStyles: widgetStyles,
      };
    },
    resetDropdown: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const {
  setDropdownOptions,
  setDropdownSource,
  setDropdownUrl,
  setDropdownFontSize,
  setLabel,
  resetDropdown,
  setWidgetStyles,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;



// // src/redux/slices/dropdownSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   dropdownOptions: [],
//   dropdownSource: 'manual', // 'manual' or 'api'
//   dropdownUrl: '',
//   dropdownFontSize: '16px',
//   label: '',
// };

// const dropdownSlice = createSlice({
//   name: 'dropdown',
//   initialState,
//   reducers: {
//     setDropdownOptions: (state, action) => {
//       state.dropdownOptions = action.payload;
//     },
//     setDropdownSource: (state, action) => {
//       state.dropdownSource = action.payload;
//     },
//     setDropdownUrl: (state, action) => {
//       state.dropdownUrl = action.payload;
//     },
//     setDropdownFontSize: (state, action) => {
//       state.dropdownFontSize = action.payload;
//     },
//     setLabel: (state, action) => {
//       state.label = action.payload;
//     },
//     resetDropdown: (state) => {
//       return initialState;
//     },
//   },
// });

// export const {
//   setDropdownOptions,
//   setDropdownSource,
//   setDropdownUrl,
//   setDropdownFontSize,
//   setLabel,
//   resetDropdown,
// } = dropdownSlice.actions;

// export default dropdownSlice.reducer;
