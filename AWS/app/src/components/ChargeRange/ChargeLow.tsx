import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface ChargeLowProps {
  onChange: (low: number) => void;
  chargeLowProp: number;
}

const ChargeLow: React.FC<ChargeLowProps> = ({ onChange, chargeLowProp }) => {
  const [lowInputValue, setLowInputValue] = useState<string>('');

    const handleInputChange = (value: string) => {
        setLowInputValue(value);
    };

  const handleBlur = () => {
    const parsedValue = parseFloat(lowInputValue);
    const newValue = isNaN(parsedValue) ? 0 : parsedValue;
    onChange(newValue);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%', maxWidth: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic-low"
        label="Charge [ C ]"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value)}
        value={lowInputValue}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export default ChargeLow;
