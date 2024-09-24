import React, { useState } from 'react'; // Importing React and useState hook
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI
import '../styles/Controls.css'; // Importing CSS styles for the component

/**
 * Props for the TextBox component.
 * 
 * @interface TextBoxProps
 * @property {function} onChange - Callback function to handle changes to the input value.
 * @property {number} limitValueProp - The initial value or limit for the number of data values.
 */
interface TextBoxProps {
  onChange: (value: number) => void; // Callback function to return the input value
  limitValueProp: number; // Initial limit value for the input
}

/**
 * TextBox component.
 * 
 * This component renders an input field (TextField from Material-UI) for entering a limit on the number of data values.
 * The user can input a number, and when the field loses focus, the value is validated and updated.
 * 
 * @component
 * @param {TextBoxProps} props - The props for the TextBox component.
 * @returns {JSX.Element} The rendered TextBox component.
 */
const TextBox: React.FC<TextBoxProps> = ({ onChange }) => {
  // State hook to manage the input value
  const [inputValue, setInputValue] = useState<string>(''); // Initially empty input value

  /**
   * Function to handle changes in the input field.
   * 
   * Updates the internal state `inputValue` whenever the user types into the input.
   * 
   * @param {string} value - The new value entered by the user.
   */
  const handleInputChange = (value: string) => {
    setInputValue(value); // Update the input value in the state
  };

  /**
   * Function to handle the blur event (when the user leaves the input field).
   * 
   * When the input field loses focus, this function validates the input value.
   * If the value is a valid number, it is passed to the `onChange` prop.
   * If the input is not a valid number, the value defaults to 100.
   */
  const handleBlur = () => {
    const parsedValue = parseInt(inputValue, 10); // Parse the input value as an integer
    const newValue = isNaN(parsedValue) ? 100 : parsedValue; // If the input is not a valid number, default to 100
    onChange(newValue); // Call the onChange prop with the validated value
  };

  return (
    <TextField
      id="outlined-basic" // Unique identifier for the text field component
      label="Number of Data Values" // The label displayed above the input field
      variant="outlined" // The variant of the text field (outlined style)
      onChange={(e) => handleInputChange(e.target.value)} // Handle the input change and update the state
      value={inputValue} // Set the value of the input field to the state value
      onBlur={handleBlur} // Handle the blur event to validate the input when focus is lost
    />
  );
};

export default TextBox; // Export the TextBox component as the default export
