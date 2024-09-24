import React, { useState } from 'react'; // Importing React and useState hook from React library
import MenuItem from '@mui/material/MenuItem'; // Importing MenuItem component from Material-UI for dropdown options
import FormControl from '@mui/material/FormControl'; // Importing FormControl component from Material-UI to wrap form fields
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importing Select component and SelectChangeEvent type from Material-UI for dropdown
import InputLabel from '@mui/material/InputLabel'; // Importing InputLabel component from Material-UI for labeling dropdowns
import FormHelperText from '@mui/material/FormHelperText'; // Importing FormHelperText component from Material-UI for helper/error text

/**
 * Props for the DropDown component.
 * 
 * @interface DropDownProps
 * @property {string} label - The label for the dropdown.
 * @property {string[]} values - Array of options for the dropdown.
 * @property {function} onChange - Function to handle changes when a new value is selected.
 */
interface DropDownProps {
  label: string; // Label for the dropdown field
  values: string[]; // List of string values for the dropdown options
  onChange: (value: string) => void; // Callback function to handle the value change
}

/**
 * DropDown component for selecting an axis or other options.
 * 
 * This component renders a dropdown menu with a label and a list of options provided via the `values` prop.
 * When an option is selected, it updates the internal state and notifies the parent component through the `onChange` callback.
 * 
 * @component
 * @param {DropDownProps} props - Props for the DropDown component.
 * @returns {JSX.Element} The rendered DropDown component.
 */
const DropDown: React.FC<DropDownProps> = ({ label, values, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // State to track the selected dropdown value

  /**
   * Handles changes in the dropdown value.
   * 
   * @param {SelectChangeEvent<string>} event - The change event triggered when a new dropdown value is selected.
   */
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value; // Get the newly selected value from the event
    setSelectedValue(newValue); // Update the state with the new value
    onChange(newValue); // Call the onChange prop to notify the parent component about the value change
  };

  // Rendering the dropdown component with Material-UI components
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}> {/* Wrapper for the dropdown with some margin and minimum width */}
      {/* Label for the dropdown */}
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      {/* Select dropdown component */}
      <Select
        labelId={`label-${label}`} // Label ID for accessibility
        id={`select-${label}`} // Unique ID for the dropdown field
        value={selectedValue} // Selected value from the component's state
        label={label} // Label displayed on the dropdown
        onChange={handleChange} // Function to handle the change event when a value is selected
      >
        {/* Default 'None' option */}
        <MenuItem value="">
          <em>None</em> {/* Italicized 'None' option */}
        </MenuItem>
        {/* Mapping through the values array to create dropdown options */}
        {values.map((value) => (
          <MenuItem key={value} value={value}> {/* Each option is represented by a MenuItem */}
            {value} {/* Displaying the option value */}
          </MenuItem>
        ))}
      </Select>
      {/* Optional helper text (could be used for validation or guidance) */}
      <FormHelperText></FormHelperText>
    </FormControl>
  );
};

export default DropDown; // Exporting the DropDown component for use in other parts of the application
