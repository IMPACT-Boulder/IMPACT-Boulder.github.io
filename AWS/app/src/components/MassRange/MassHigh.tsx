// MassHigh.tsx
import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI library
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI library

// Define props interface for MassHigh component
interface MassHighProps {
  onChange: (high: number) => void; // Function to handle change in high mass value
  massHighProp: number; // Current high mass value passed as prop
}

// Functional component for handling high mass input
const MassHigh: React.FC<MassHighProps> = ({ onChange }) => {
  const [highInputValue, setHighInputValue] = useState<string>(''); // State to manage high mass input value

  // Function to handle input change
  const handleInputChange = (value: string) => {
    setHighInputValue(value); // Update input value state
  };

  // Function to handle blur event (when input field loses focus)
  const handleBlur = () => {
    const parsedValue = parseFloat(highInputValue); // Parse input value to float
    const newValue = isNaN(parsedValue) ? 1000000000000 : parsedValue; // If parsed value is NaN, set default value to trillion (arbitrary)
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
        {/* Text field for entering high mass value */}
        <TextField
          id="outlined-basic-low"
          label="Mass [ kg ]"
          variant="outlined"
          onChange={(e) => handleInputChange(e.target.value)} // Handle input change event
          value={highInputValue} // Assign input value
          onBlur={handleBlur} // Handle blur event
        />
      </Box>
    </div>
  );
};

export default MassHigh; // Exporting MassHigh component