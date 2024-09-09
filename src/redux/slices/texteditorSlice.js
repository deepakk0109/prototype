// redux/slices/textEditorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const textEditorSlice = createSlice({
  name: 'textEditor',
  initialState,
  reducers: {
    setTextEditorContent: (state, action) => {
      const { widgetId, content } = action.payload;
      state[widgetId] = { content };
      
    },
    resetTextEditor: (state, action) => {
      const { widgetId } = action.payload;
      delete state[widgetId];
    },
  },
});

export const { setTextEditorContent, resetTextEditor } = textEditorSlice.actions;
export default textEditorSlice.reducer;
