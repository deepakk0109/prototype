import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      const { widgetId, data } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        data: data,
      };
    },
    setTableColumns: (state, action) => {
      const { widgetId, columns } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        columns: columns,
      };
    },
    setTableUrl: (state, action) => {
      const { widgetId, url } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        url: url,
      };
    },
    resetTable: (state, action) => {
      const { widgetId } = action.payload;
      state[widgetId] = {};
    },
  },
});

export const {
  setTableData,
  setTableColumns,
  setTableUrl,
  resetTable,
} = tableSlice.actions;

export default tableSlice.reducer;
