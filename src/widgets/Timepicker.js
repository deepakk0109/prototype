import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';

const Timepicker = () => {
  const [value, setValue] = useState(new Date());
console.log("value",value);
  return (
    <div>
      <label htmlFor="time-picker">Select Time:</label>
      <DateTimePicker
        onChange={setValue}
        value={value}
        disableClock={true}  // Disables the clock display
        format="h:mm a"   // 12-hour format with seconds and AM/PM
      />
    </div>
  );
};

export default Timepicker;
