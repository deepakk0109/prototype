import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { setDate } from "../redux/slices/datepickerSlice";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/DatePicker.css'; // Import your custom CSS file

const Datepicker = ({ SelectedDate, updateDateWidget, widgetId, isPreview }) => {
  const dispatch = useDispatch();

  // Get selected date from Redux and ensure it's a valid date object
  const selectedDate = useSelector((state) => {
    const storedDate = state.date[widgetId]?.selectedDate;
    return storedDate ? new Date(storedDate) : null;
  });

  useEffect(() => {
    // Ensure SelectedDate is a valid Date object or null
    const dateToSet = SelectedDate ? new Date(SelectedDate) : new Date();
    dispatch(setDate({ widgetId, date: dateToSet.toISOString() }));
  }, [SelectedDate, dispatch, widgetId]);

  // Handle date changes and dispatch the new date to Redux
  const handleChange = (date) => {
    if (date) {
      dispatch(setDate({ widgetId, date: date.toISOString() }));
      updateDateWidget(widgetId, date);
    }
  };

  return (
    <DatePicker
      selected={selectedDate} // Ensure selected is a Date object
      onChange={handleChange}
      showTimeSelect // Enables time selection
      timeFormat="HH:mm" // Time format (24-hour)
      timeIntervals={15} // Time interval for the time picker (15 minutes)
      dateFormat="dd/MM/yyyy HH:mm" // Date and time format
      timeInputLabel="Time" // Optional: Label for the manual time input field
      disabled={isPreview}
      // Optional: Ensures manual input is accepted
      timeCaption="Time"
      placeholderText="Select date and time"
    />
  );
};

export default Datepicker;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import { setDate } from "../redux/slices/datepickerSlice";
// import "react-datepicker/dist/react-datepicker.css";

// const Datepicker = ({ SelectedDate, updateDateWidget, widgetId,isPreview }) => {
//   const dispatch = useDispatch();

//   // Get selected date from Redux and ensure it's a valid date object
//   const selectedDate = useSelector((state) => {
//     const storedDate = state.date[widgetId]?.selectedDate;
//     return storedDate ? new Date(storedDate) : null;
//   });

//   useEffect(() => {
//     dispatch(setDate({ widgetId, date: SelectedDate || new Date().toISOString() }));
//   }, [SelectedDate, dispatch, widgetId]);

//   // Handle date changes and dispatch the new date to Redux
//   const handleChange = (date) => {
//       dispatch(setDate({ widgetId, date: date.toISOString() }));
//       updateDateWidget(widgetId, date);
//   };

//   return (
//     <DatePicker
//       selected={selectedDate} 
//       onChange={handleChange}
//       dateFormat="dd/MM/yyyy HH:mm"
//       disabled={isPreview}
//     />
//   );
// };

// export default Datepicker;


