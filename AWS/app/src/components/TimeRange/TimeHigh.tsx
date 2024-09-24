import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout and spacing
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI for input field
import DatePicker from 'react-datepicker'; // Importing DatePicker component for selecting dates and times
import 'react-datepicker/dist/react-datepicker.css'; // Importing CSS for DatePicker component

/**
 * Props for the TimeHigh component.
 * 
 * @interface TimeHighProps
 * @property {function} onChange - Function to handle changes in the high time input.
 * @property {number | null} timeHighProp - The current high time value passed as a prop.
 */
interface TimeHighProps {
  onChange: (high: number | null) => void; // Function to handle changes in the high time value
  timeHighProp: number | null; // The current high time value provided by the parent component
}

/**
 * TimeHigh component for inputting the upper limit for time.
 * 
 * This component renders a DatePicker and allows the user to select a high time value.
 * The selected time is passed to the parent component via the `onChange` function as a Unix timestamp.
 * 
 * @component
 * @param {TimeHighProps} props - The props for the TimeHigh component.
 * @returns {JSX.Element} The rendered TimeHigh component.
 */
const TimeHigh: React.FC<TimeHighProps> = ({ onChange, timeHighProp }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    timeHighProp ? new Date(timeHighProp) : null // Initialize selectedDate state based on timeHighProp
  ); 

  /**
   * Handles changes in the date selection.
   * 
   * @param {Date | null} date - The new selected date or null.
   */
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Update selected date state
    if (date) {
      const unixTimestamp = date.getTime(); // Convert selected date to Unix timestamp
      onChange(unixTimestamp); // Pass the Unix timestamp to the parent component
    }
  };

  /**
   * Formats the date to an ISO string.
   * 
   * @param {Date | null} date - The date to format.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().slice(0, -5) : ''; // Format the date as an ISO string (without milliseconds)
  };

  return (
    <div className='constraint'> {/* Container for the constraint section */}
      <Box
        component="form" // Render Box as a form for layout
        sx={{
          '& > :not(style)': { m: 1, ml: 2, width: '100%', maxWidth: '20ch' }, // Apply margin and width styles
          '@media (max-width: 546px)': { '& > :not(style)': { ml: 1 } } // Adjust layout for smaller screens
        }}
        noValidate // Disable form validation
        autoComplete="off" // Disable autocomplete
      >
        {/* DatePicker component for selecting the high time */}
        <DatePicker
          selected={selectedDate} // The currently selected date
          onChange={handleDateChange} // Handle date change
          showTimeSelect // Enable time selection
          timeFormat="HH:mm" // Time format for the picker
          timeIntervals={15} // 15-minute intervals for time selection
          dateFormat="yyyy-MM-dd HH:mm:ss.SSS" // Full date and time format with milliseconds
          customInput={
            <TextField
              id="outlined-basic-high" // Unique ID for the input field
              label="Time YYYY-mm-dd HH:MM:SS.f" // Label for the input field
              variant="outlined" // Use the outlined variant for the text field
              value={formatDate(selectedDate)} // Display the formatted date value
              onChange={() => {}} // No direct onChange handling here (handled by DatePicker)
              onBlur={() => {}} // No direct onBlur handling here
            />
          }
        />
      </Box>
    </div>
  );
};

export default TimeHigh; // Exporting TimeHigh component for use in other parts of the application
