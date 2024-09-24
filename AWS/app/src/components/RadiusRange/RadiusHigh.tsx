import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout and spacing
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI for input field

/**
 * Props for the RadiusHigh component.
 * 
 * @interface RadiusHighProps
 * @property {function} onChange - Function to handle changes in the high radius input.
 * @property {number} radiusHighProp - The current high radius value passed as a prop.
 */
interface RadiusHighProps {
  onChange: (high: number) => void; // Function to handle changes in high radius value
  radiusHighProp: number; // The current high radius value provided by the parent component
}

/**
 * RadiusHigh component for inputting the upper limit for radius.
 * 
 * This component renders a TextField for inputting the high radius value. The user can type a number, which is passed
 * to the parent component upon losing focus.
 * 
 * @component
 * @param {RadiusHighProps} props - The props for the RadiusHigh component.
 * @returns {JSX.Element} The rendered RadiusHigh component.
 */
const RadiusHigh: React.FC<RadiusHighProps> = ({ onChange }) => {
  const [highInputValue, setHighInputValue] = useState<string>(''); // State to manage the input value for high radius

  /**
   * Handles changes in the input field for high radius.
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
    const parsedValue = parseFloat(highInputValue); // Parse the input value to a float (decimal)
    const newValue = isNaN(parsedValue) ? 1000000000000 : parsedValue; // If the value is not a number, set it to 1 trillion (default)
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
        {/* Text field for high radius input */}
        <TextField
          id="outlined-basic-high" // Unique ID for the input field
          label="Radius [ m ]" // Label for the input field
          variant="outlined" // Use the outlined variant for the text field
          onChange={(e) => handleInputChange(e.target.value)} // Call handleInputChange on every input change
          value={highInputValue} // The current value of the input field
          onBlur={handleBlur} // Call handleBlur when the input field loses focus
        />
      </Box>
    </div>
  );
};

export default RadiusHigh; // Exporting RadiusHigh component for use in other parts of the application
