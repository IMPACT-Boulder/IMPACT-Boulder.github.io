import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface MassHighProps {
  onChange: (high: number) => void;
  massHighProp: number;
}

const MassHigh: React.FC<MassHighProps> = ({ onChange, massHighProp }) => {
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
        id="outlined-basic-low"
        label="Mass [ kg ]"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value)}
        value={highInputValue}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export default MassHigh;