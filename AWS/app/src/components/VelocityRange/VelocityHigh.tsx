// VelocityHigh.tsx
import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI library
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI library

// Define props interface for VelocityHigh component
interface VelocityHighProps {
  onChange: (high: number) => void; // Function to handle change in high velocity value
  velHighProp: number; // Current high velocity value passed as prop
}

// Functional component for handling high velocity input
const VelocityHigh: React.FC<VelocityHighProps> = ({ onChange }) => {
  const [highInputValue, setHighInputValue] = useState<string>(''); // State to manage high velocity input value

  // Function to handle input change
  const handleInputChange = (value: string) => {
    setHighInputValue(value); // Update input value state
  };

  // Function to handle blur event (when input field loses focus)
  const handleBlur = () => {
    const parsedValue = parseInt(highInputValue, 10); // Parse input value to integer
    const newValue = isNaN(parsedValue) ? Infinity : parsedValue; // If parsed value is NaN, set default value to Infinity
    onChange(newValue); // Call onChange function with new value
  };

  // Rendering the component
  return (
    <div className='constraint'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%', maxWidth: '20ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {/* Text field for entering high velocity value */}
        <TextField
          id="outlined-basic-high"
          label="Velocity [ km/s ]"
          variant="outlined"
          onChange={(e) => handleInputChange(e.target.value)} // Handle input change event
          value={highInputValue} // Assign input value
          onBlur={handleBlur} // Handle blur event
        />
      </Box>
    </div>
  );
};

export default VelocityHigh; // Exporting VelocityHigh component
