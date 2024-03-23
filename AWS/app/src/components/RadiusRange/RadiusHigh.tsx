import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface RadiusHighProps {
  onChange: (high: number) => void;
  radiusHighProp: number;
}

const RadiusHigh: React.FC<RadiusHighProps> = ({ onChange, radiusHighProp }) => {
  const [highInputValue, setHighInputValue] = useState<string>('');

    const handleInputChange = (value: string) => {
        setHighInputValue(value);
    };

  const handleBlur = () => {
    const parsedValue = parseFloat(highInputValue);
    const newValue = isNaN(parsedValue) ? 1000000000000  : parsedValue;
    onChange(newValue);
  };

  return (
    <div className='constraint'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%', maxWidth: '20ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic-high"
          label="Radius [ m ]"
          variant="outlined"
          onChange={(e) => handleInputChange(e.target.value)}
          value={highInputValue}
          onBlur={handleBlur}
        />
      </Box>
    </div>
  );
};

export default RadiusHigh;