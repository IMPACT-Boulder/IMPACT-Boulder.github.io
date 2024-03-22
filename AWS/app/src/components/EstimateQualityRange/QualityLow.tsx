import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

interface QualityLowProps {
  onChange: (low: number) => void;
  qualLowProp: number;
}

const QualityLow: React.FC<QualityLowProps> = ({ onChange, qualLowProp }) => {
  const [lowInputValue, setLowInputValue] = useState<string>('');

  const handleDropDownChange = (value: string) => {
    setLowInputValue(value);
  };

  const handleBlur = () => {
    const parsedValue = parseInt(lowInputValue, 10);
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label-quality-low">Estimate Quality</InputLabel>
        <Select
          labelId="label-quality-low"
          id="select-quality-low"
          value={lowInputValue}
          label="Estimate Quality"
          onChange={(e: SelectChangeEvent<string>) => handleDropDownChange(e.target.value)}
          onBlur={handleBlur}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value.toString()}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default QualityLow;
