// TimeHigh.tsx
import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI library
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI library
import DatePicker from 'react-datepicker'; // Importing DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Importing DatePicker CSS

// Define props interface for TimeHigh component
interface TimeHighProps {
  onChange: (high: number | null) => void; // Function to handle change in high time value
  timeHighProp: number | null; // Current high time value passed as prop
}

// Functional component for handling high time input
const TimeHigh: React.FC<TimeHighProps> = ({ onChange, timeHighProp }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    timeHighProp ? new Date(timeHighProp) : null
  ); // State to manage selected date

  // Function to handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Update selected date state
    if (date) {
      const unixTimestamp = date.getTime(); // Get Unix timestamp
      onChange(unixTimestamp); // Call onChange function with new value
    }
  };

  // Function to format date
  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().slice(0, -5) : ''; // Format date to ISO string
  };

  // Rendering the component
  return (
    <div className='constraint'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, ml: 2, width: '100%', maxWidth: '20ch' }, 
          '@media (max-width: 546px)': {
            '& > :not(style)': {ml: 1}
          }
        }}
        noValidate
        autoComplete="off"
      >
        {/* DatePicker component for choosing high time */}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm:ss.SSS"
          customInput={
            <TextField
              id="outlined-basic-high"
              label="Time YYYY-mm-dd HH:MM:SS.f"
              variant="outlined"
              value={formatDate(selectedDate)}
              onChange={() => {}}
              onBlur={() => {}}
            />
          }
        />
      </Box>
    </div>
  );
};

export default TimeHigh; // Exporting TimeHigh component