import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

interface QualityHighProps {
  onChange: (high: number) => void;
  qualHighProp: number;
}

const QualityHigh: React.FC<QualityHighProps> = ({ onChange, qualHighProp }) => {
  const [highInputValue, setHighInputValue] = useState<string>('');

  const handleDropDownChange = (value: string) => {
    setHighInputValue(value);
  };

  const handleBlur = () => {
    const parsedValue = parseInt(highInputValue, 10);
    const newValue = isNaN(parsedValue) ? 100 : parsedValue;
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label-quality-high">Estimate Quality</InputLabel>
        <Select
          labelId="label-quality-high"
          id="select-quality-high"
          value={highInputValue}
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

export default QualityHigh;
