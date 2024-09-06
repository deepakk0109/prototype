import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the Datepicker component with props
const Datepicker = ({ selectedDate, onDateChange }) => {
  // Initialize state with the selectedDate prop or default to the current date
  const [startDate, setStartDate] = useState(selectedDate || new Date());

  // Update local state when the selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  }, [selectedDate]);

  // Handle date changes and propagate them using the onDateChange callback
  const handleChange = (date) => {
    setStartDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="MM/dd/yyyy" // Customize date format if needed
    />
  );
};

export default Datepicker;
