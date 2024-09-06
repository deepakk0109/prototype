import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const imagepickerSlice = createSlice({
  name: 'imagepicker',
  initialState,
  reducers: {
    setImageSrc: (state, action) => {
      const { widgetId, imageSrc } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        imageSrc: imageSrc,
      };
    },
    resetImagePicker: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const {
    setImageSrc,
    resetImagePicker,
} = imagepickerSlice.actions;

export default imagepickerSlice.reducer;

