import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout and spacing
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI for input field
import DatePicker from 'react-datepicker'; // Importing DatePicker component for selecting dates and times
import '../../styles/Time.css'; // Importing custom CSS for styling the time-related components

/**
 * Props for the TimeLow component.
 * 
 * @interface TimeLowProps
 * @property {function} onChange - Function to handle changes in the low time input.
 * @property {number} timeLowProp - The current low time value passed as a prop.
 */
interface TimeLowProps {
  onChange: (low: number) => void; // Function to handle changes in the low time value
  timeLowProp: number; // The current low time value provided by the parent component
}

/**
 * TimeLow component for inputting the lower limit for time.
 * 
 * This component renders a DatePicker and allows the user to select a low time value.
 * The selected time is passed to the parent component via the `onChange` function as a Unix timestamp.
 * 
 * @component
 * @param {TimeLowProps} props - The props for the TimeLow component.
 * @returns {JSX.Element} The rendered TimeLow component.
 */
const TimeLow: React.FC<TimeLowProps> = ({ onChange, timeLowProp }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    timeLowProp ? new Date(timeLowProp) : null // Initialize selectedDate state based on timeLowProp
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
        {/* DatePicker component for selecting the low time */}
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

export default TimeLow; // Exporting TimeLow component for use in other parts of the application
