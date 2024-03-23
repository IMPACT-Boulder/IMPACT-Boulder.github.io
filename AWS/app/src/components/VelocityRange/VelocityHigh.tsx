import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface VelocityHighProps {
  onChange: (high: number) => void;
  velHighProp: number;
}

const VelocityHigh: React.FC<VelocityHighProps> = ({ onChange, velHighProp }) => {
  const [highInputValue, setHighInputValue] = useState<string>('');

const handleInputChange = (value: string) => {
    setHighInputValue(value);
};

const handleBlur = () => {
  const parsedValue = parseInt(highInputValue, 10);
  const newValue = isNaN(parsedValue) ? Infinity : parsedValue;
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
          label="Velocity [ km/s ]"
          variant="outlined"
          onChange={(e) => handleInputChange(e.target.value)}
          value={highInputValue}
          onBlur={handleBlur}
        />
      </Box>
    </div>
  );
};

export default VelocityHigh;
