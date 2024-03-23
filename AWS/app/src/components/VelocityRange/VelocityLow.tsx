import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface VelocityLowProps {
  onChange: (low: number) => void;
  velLowProp: number;
}

const VelocityLow: React.FC<VelocityLowProps> = ({ onChange, velLowProp }) => {
  const [lowInputValue, setLowInputValue] = useState<string>('');

    const handleInputChange = (value: string) => {
        setLowInputValue(value);
    };

  const handleBlur = () => {
    const parsedValue = parseInt(lowInputValue, 10);
    const newValue = isNaN(parsedValue) ? 0 : parsedValue;
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
          id="outlined-basic-low"
          label="Velocity [ km/s ]"
          variant="outlined"
          onChange={(e) => handleInputChange(e.target.value)}
          value={lowInputValue}
          onBlur={handleBlur}
        />
      </Box>
    </div>
  );
};

export default VelocityLow;
