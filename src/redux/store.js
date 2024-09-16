import { configureStore } from '@reduxjs/toolkit';
import dropdownReducer from './slices/dropdownSlice';
import tableReducer from './slices/tableSlice';
import checkboxReducer from './slices/checkboxSlice';
import radiobuttonReducer from './slices/radiobuttonSlice'
import fileReducer from './slices/fileSlice'
import imagepickerReducer from './slices/imagepickerSlice'
import chartReducer from './slices/chartSlice'
import dateReducer from './slices/datepickerSlice'
import textEditorReducer from './slices/texteditorSlice'
import formReducer from './slices/formSlice'
import buttonReducer from './slices/buttonSlice'
import lineReducer from './slices/lineSlice'
export const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    table: tableReducer,
    checkbox: checkboxReducer,
    radiobutton:radiobuttonReducer,
    file:fileReducer,
    imagepicker:imagepickerReducer,
    chart: chartReducer,
    date:dateReducer,
    textEditor: textEditorReducer,
    form:formReducer,
    button:buttonReducer,
    line:lineReducer,
  },
});
