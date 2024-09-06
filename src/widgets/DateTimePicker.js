import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

// Custom DateTime Picker Component
const CustomDateTimePicker = ({ onChange, value }) => {
  const [showDate, setShowDate] = useState(true); // Date can be shown/hidden
  const [showTime, setShowTime] = useState(false); // Time is never shown

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const updateDateTimeWidget = (newValue) => {
    handleChange(newValue);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showDate}
            onChange={() => setShowDate(!showDate)}
          />
          Show Date
        </label>
        {/* Time checkbox is removed since we never want to show time */}
      </div>
      <DateTimePicker
        onChange={updateDateTimeWidget}
        value={value}
        disableCalendar={!showDate}  // Disable calendar if date is not shown
        disableClock={!showTime}     // Disable clock, though it's always disabled
      />
    </div>
  );
};

// Main Application Component
const DateTime = () => {
  const [value, setValue] = useState(new Date());

  const handleDateTimeChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1>Custom DateTime Picker</h1>
      <CustomDateTimePicker
        value={value}
        onChange={handleDateTimeChange}
      />
    </div>
  );
};

export default DateTime;
