import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import '../styles/Limit.css'

interface TextBoxProps {
  onChange: (value: number) => void;
  limitValueProp: number;
}

const TextBox: React.FC<TextBoxProps> = ({ onChange, limitValueProp }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleBlur = () => {
    const parsedValue = parseInt(inputValue, 10);
    const newValue = isNaN(parsedValue) ? 100 : parsedValue;
    onChange(newValue);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Number of Data Values"
      variant="outlined"
      onChange={(e) => handleInputChange(e.target.value)}
      value={inputValue}
      onBlur={handleBlur}
    />
  );
};

export default TextBox;
