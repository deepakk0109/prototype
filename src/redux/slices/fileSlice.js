import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action) => {
      const { widgetId, file } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        file: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
      };
    },
    setFileBackendUrl: (state, action) => {
      const { widgetId, fileBackendUrl } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        fileBackendUrl: fileBackendUrl,
      };
    },
    setUploadButtonStyle: (state, action) => {
      const { widgetId, uploadButtonStyle } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        uploadButtonStyle: uploadButtonStyle,
      };
    },

    resetfile: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const {
    setFile,
    setFileBackendUrl,
    setUploadButtonStyle,
    resetfile,
} = fileSlice.actions;

export default fileSlice.reducer;

