// inputLimit.tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI
import '../styles/Controls.css'; // Importing CSS styles

interface TextBoxProps {
  onChange: (value: number) => void; // Define prop types for TextBox component
  limitValueProp: number; // Define prop types for TextBox component
}

const TextBox: React.FC<TextBoxProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState<string>(''); // State hook for input value

  // Function to handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value); // Update input value state
  };

  // Function to handle input blur
  const handleBlur = () => {
    const parsedValue = parseInt(inputValue, 10); // Parse input value to integer
    const newValue = isNaN(parsedValue) ? 100 : parsedValue; // Set new value or default to 100 if NaN
    onChange(newValue); // Call onChange callback with new value
  };

  return (
    <TextField
      id="outlined-basic"
      label="Number of Data Values" // Label for text field
      variant="outlined" // Variant of the text field
      onChange={(e) => handleInputChange(e.target.value)} // Handle input change event
      value={inputValue} // Current value of the text field
      onBlur={handleBlur} // Handle blur event
    />
  );
};

export default TextBox; // exporting TextBox component
