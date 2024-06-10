// axisDropDown.tsx
import React, { useState } from 'react'; // Importing necessary components from React library
import MenuItem from '@mui/material/MenuItem'; // Importing MenuItem component from Material-UI library
import FormControl from '@mui/material/FormControl'; // Importing FormControl component from Material-UI library
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importing Select component and related types from Material-UI library
import InputLabel from '@mui/material/InputLabel'; // Importing InputLabel component from Material-UI library
import FormHelperText from '@mui/material/FormHelperText'; // Importing FormHelperText component from Material-UI library

// Define props interface for DropDown component
interface DropDownProps {
  label: string; // Label for the dropdown
  values: string[]; // List of values for the dropdown
  onChange: (value: string) => void; // Function to handle change in dropdown value
}

// Functional component for dropdown selection
const DropDown: React.FC<DropDownProps> = ({ label, values, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // State to manage selected dropdown value

  // Function to handle change in dropdown value
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value; // Get selected value from event
    setSelectedValue(newValue); // Update selected value state
    onChange(newValue); // Call onChange function with new value
  };

  // Rendering the component
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      {/* Label for the dropdown */}
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      {/* Dropdown selection */}
      <Select
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={selectedValue} // Selected value for the dropdown
        label={label}
        onChange={handleChange} // Handle change in dropdown value
      >
        {/* Default option for none */}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {/* Mapping over values to create dropdown options */}
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {/* Helper text for the dropdown */}
      <FormHelperText></FormHelperText>
    </FormControl>
  );
};

export default DropDown; // Exporting DropDown component
