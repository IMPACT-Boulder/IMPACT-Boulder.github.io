// ChargeLow.tsx
import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI library
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI library

// Define props interface for ChargeLow component
interface ChargeLowProps {
  onChange: (low: number) => void; // Function to handle change in low charge value
  chargeLowProp: number; // Current low charge value passed as prop
}

// Functional component for handling low charge input
const ChargeLow: React.FC<ChargeLowProps> = ({ onChange }) => {
  const [lowInputValue, setLowInputValue] = useState<string>(''); // State to manage low charge input value

  // Function to handle input change
  const handleInputChange = (value: string) => {
    setLowInputValue(value); // Update input value state
  };

  // Function to handle blur event (when input field loses focus)
  const handleBlur = () => {
    const parsedValue = parseFloat(lowInputValue); // Parse input value to float
    const newValue = isNaN(parsedValue) ? 0 : parsedValue; // If parsed value is NaN, set default value to 0
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
        {/* Text field for entering low charge value */}
        <TextField
          id="outlined-basic-low"
          label="Charge [ C ]"
          variant="outlined"
          onChange={(e) => handleInputChange(e.target.value)} // Handle input change event
          value={lowInputValue} // Assign input value
          onBlur={handleBlur} // Handle blur event
        />
      </Box>
    </div>
  );
};

export default ChargeLow; // Exporting ChargeLow component
