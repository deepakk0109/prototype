import { configureStore } from '@reduxjs/toolkit';
import dropdownReducer from './slices/dropdownSlice';
import tableReducer from './slices/tableSlice';
import checkboxReducer from './slices/checkboxSlice';
import radiobuttonReducer from './slices/radiobuttonSlice'
import fileReducer from './slices/fileSlice'
import imagepickerReducer from './slices/imagepickerSlice'
import chartReducer from './slices/chartSlice'
export const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    table: tableReducer,
    checkbox: checkboxReducer,
    radiobutton:radiobuttonReducer,
    file:fileReducer,
    imagepicker:imagepickerReducer,
    chart: chartReducer,
  },
});
