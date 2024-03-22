import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface MassLowProps {
  onChange: (low: number) => void;
  massLowProp: number;
}

const MassLow: React.FC<MassLowProps> = ({ onChange, massLowProp }) => {
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
        label="Mass [ kg ]"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value)}
        value={lowInputValue}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export default MassLow;
