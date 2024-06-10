// QualityHigh.tsx
import React, { useState } from 'react'; // Importing necessary components from React library
import Box from '@mui/material/Box'; // Importing Box component from Material-UI library
import MenuItem from '@mui/material/MenuItem'; // Importing MenuItem component from Material-UI library
import FormControl from '@mui/material/FormControl'; // Importing FormControl component from Material-UI library
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importing Select and SelectChangeEvent components from Material-UI library
import InputLabel from '@mui/material/InputLabel'; // Importing InputLabel component from Material-UI library
import FormHelperText from '@mui/material/FormHelperText'; // Importing FormHelperText component from Material-UI library

// Define props interface for QualityHigh component
interface QualityHighProps {
  onChange: (high: number) => void; // Function to handle change in high quality value
  qualHighProp: number; // Current high quality value passed as prop
}

// Functional component for handling high quality input
const QualityHigh: React.FC<QualityHighProps> = ({ onChange}) => {
  const [highInputValue, setHighInputValue] = useState<string>(''); // State to manage high quality input value

  // Function to handle dropdown change
  const handleDropDownChange = (value: string) => {
    setHighInputValue(value); // Update dropdown value state
  };

  // Function to handle blur event (when dropdown loses focus)
  const handleBlur = () => {
    const parsedValue = parseInt(highInputValue, 10); // Parse dropdown value to integer
    const newValue = isNaN(parsedValue) ? 100 : parsedValue; // If parsed value is NaN, set default value to 100
    onChange(newValue); // Call onChange function with new value
  };

  // Rendering the component
  return (
    <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '20%', // width of the parent container
          '@media (max-width: 546px)': {
            width: '89%' // Change width to 89% when the screen width is less than 546px
          }
        }}
        noValidate
        autoComplete="off"
    >
      <FormControl fullWidth sx={{ m: 1 , ml: 4}} >
        <InputLabel id="label-quality-high">Estimate Quality</InputLabel>
        {/* Select dropdown for choosing high quality */}
        <Select
          labelId="label-quality-high"
          id="select-quality-high"
          value={highInputValue} // Assign dropdown value
          label="Estimate Quality"
          onChange={(e: SelectChangeEvent<string>) => handleDropDownChange(e.target.value)} // Handle dropdown change event
          onBlur={handleBlur} // Handle blur event
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value.toString()}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default QualityHigh; // Exporting QualityHigh component