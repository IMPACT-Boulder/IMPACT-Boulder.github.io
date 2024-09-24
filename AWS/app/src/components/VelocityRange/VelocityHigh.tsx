import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout and spacing
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI for input field

/**
 * Props for the VelocityHigh component.
 * 
 * @interface VelocityHighProps
 * @property {function} onChange - Function to handle changes in the high velocity input.
 * @property {number} velHighProp - The current high velocity value passed as a prop.
 */
interface VelocityHighProps {
  onChange: (high: number) => void; // Function to handle changes in high velocity value
  velHighProp: number; // Current high velocity value provided by the parent component
}

/**
 * VelocityHigh component for inputting the upper limit for velocity.
 * 
 * This component renders an input field where the user can set a high value for velocity.
 * It provides real-time feedback on input changes and ensures that valid numbers are passed to the parent component.
 * 
 * @component
 * @param {VelocityHighProps} props - The props for the VelocityHigh component.
 * @returns {JSX.Element} The rendered VelocityHigh component.
 */
const VelocityHigh: React.FC<VelocityHighProps> = ({ onChange }) => {
  const [highInputValue, setHighInputValue] = useState<string>(''); // State to manage the input value for high velocity

  /**
   * Handles changes in the input field for high velocity.
   * 
   * @param {string} value - The new input value entered by the user.
   */
  const handleInputChange = (value: string) => {
    setHighInputValue(value); // Update the state with the new input value
  };

  /**
   * Handles the blur event when the input field loses focus.
   * 
   * This ensures that the input value is validated and passed to the parent component.
   */
  const handleBlur = () => {
    const parsedValue = parseInt(highInputValue, 10); // Parse the input value to an integer
    const newValue = isNaN(parsedValue) ? Infinity : parsedValue; // If the value is not a number, set it to Infinity
    onChange(newValue); // Pass the validated value to the parent component through onChange
  };

  return (
    <div className='constraint'> {/* Wrapper for the constraint section */}
      <Box
        component="form" // Render Box as a form for layout
        sx={{
          '& > :not(style)': { m: 1, width: '100%', maxWidth: '20ch' }, // Apply margin and width styles
        }}
        noValidate // Disable form validation
        autoComplete="off" // Disable autocomplete
      >
        {/* Text field for high velocity input */}
        <TextField
          id="outlined-basic-high" // Unique ID for the input field
          label="Velocity [ km/s ]" // Label for the input field
          variant="outlined" // Use the outlined variant for the text field
          onChange={(e) => handleInputChange(e.target.value)} // Call handleInputChange on every input change
          value={highInputValue} // The current value of the input field
          onBlur={handleBlur} // Call handleBlur when the input field loses focus
        />
      </Box>
    </div>
  );
};

export default VelocityHigh; // Exporting VelocityHigh component for use in other parts of the application
