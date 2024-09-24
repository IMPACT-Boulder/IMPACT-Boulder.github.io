import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout and spacing
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI for input field

/**
 * Props for the RadiusLow component.
 * 
 * @interface RadiusLowProps
 * @property {function} onChange - Function to handle changes in the low radius input.
 * @property {number} radiusLowProp - The current low radius value passed as a prop.
 */
interface RadiusLowProps {
  onChange: (low: number) => void; // Function to handle changes in low radius value
  radiusLowProp: number; // The current low radius value provided by the parent component
}

/**
 * RadiusLow component for inputting the lower limit for radius.
 * 
 * This component renders a TextField for inputting the low radius value. The user can type a number, which is passed
 * to the parent component upon losing focus.
 * 
 * @component
 * @param {RadiusLowProps} props - The props for the RadiusLow component.
 * @returns {JSX.Element} The rendered RadiusLow component.
 */
const RadiusLow: React.FC<RadiusLowProps> = ({ onChange }) => {
  const [lowInputValue, setLowInputValue] = useState<string>(''); // State to manage the input value for low radius

  /**
   * Handles changes in the input field for low radius.
   * 
   * @param {string} value - The new input value entered by the user.
   */
  const handleInputChange = (value: string) => {
    setLowInputValue(value); // Update the state with the new input value
  };

  /**
   * Handles the blur event when the input field loses focus.
   * 
   * This ensures that the input value is validated and passed to the parent component.
   */
  const handleBlur = () => {
    const parsedValue = parseFloat(lowInputValue); // Parse the input value to a float (decimal)
    const newValue = isNaN(parsedValue) ? 0 : parsedValue; // If the value is not a number, set it to 0
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
        {/* Text field for low radius input */}
        <TextField
          id="outlined-basic-low" // Unique ID for the input field
          label="Radius [ m ]" // Label for the input field
          variant="outlined" // Use the outlined variant for the text field
          onChange={(e) => handleInputChange(e.target.value)} // Call handleInputChange on every input change
          value={lowInputValue} // The current value of the input field
          onBlur={handleBlur} // Call handleBlur when the input field loses focus
        />
      </Box>
    </div>
  );
};

export default RadiusLow; // Exporting RadiusLow component for use in other parts of the application
