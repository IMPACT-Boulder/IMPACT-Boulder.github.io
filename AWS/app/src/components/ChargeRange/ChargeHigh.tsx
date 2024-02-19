import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface ChargeHighProps {
  onChange: (high: number) => void;
  chargeHighProp: number;
}

const ChargeHigh: React.FC<ChargeHighProps> = ({ onChange, chargeHighProp }) => {
  const [highInputValue, setHighInputValue] = useState<string>('');

    const handleInputChange = (value: string) => {
        setHighInputValue(value);
    };

  const handleBlur = () => {
    const parsedValue = parseFloat(highInputValue);
    const newValue = isNaN(parsedValue) ? 1000000000000 : parsedValue;
    onChange(newValue);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic-high"
        label="Charge [ C ]"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value)}
        value={highInputValue}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export default ChargeHigh;