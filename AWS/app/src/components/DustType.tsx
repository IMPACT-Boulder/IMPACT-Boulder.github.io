// DustType.tsx
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { uniqueDustTypesData } from '../data/dustTypesData';
import { sortBy } from 'lodash';

interface DustTypeProps {
  onChange: (types: number[]) => void;
  selectedTypes: number[];
}

const DustType: React.FC<DustTypeProps> = ({ onChange, selectedTypes }) => {
  // State hooks for selected dust types and input value
  const [typesInputValue, setTypesInputValue] = useState<string[]>(selectedTypes.map(String));
  const [selectedDustTypes, setSelectedDustTypes] = useState<{ [key: string]: string[] }>({});

  // Sort dust types data by name
  const sortedDustTypesData = sortBy(uniqueDustTypesData, ['dust_name']);

  useEffect(() => {
    // Initialize selected dust types when the component mounts
    const initialSelectedDustTypes: { [key: string]: string[] } = {};
    selectedTypes.forEach((typeId) => {
      const dustType = uniqueDustTypesData.find((type) => type.id_dust_type.includes(typeId));
      if (dustType) {
        initialSelectedDustTypes[dustType.dust_name] = [typeId.toString()];
      }
    });
    setSelectedDustTypes(initialSelectedDustTypes);
  }, [selectedTypes]);

  // Handle dropdown change
  const handleDropDownChange = (value: string | string[]) => {
    const valuesArray = Array.isArray(value) ? value : [value];
    setTypesInputValue(valuesArray);

    const updatedSelectedDustTypes: { [key: string]: string[] } = {};

    valuesArray.forEach((val) => {
      const dustTypeIds = val.split(',');

      dustTypeIds.forEach((dustTypeId) => {
        const dustType = uniqueDustTypesData.find((type) =>
          type.id_dust_type.includes(Number(dustTypeId))
        );

        if (dustType) {
          if (!updatedSelectedDustTypes[dustType.dust_name]) {
            updatedSelectedDustTypes[dustType.dust_name] = dustType.id_dust_type.map(String);
          }
          console.log(`Selected Dust Type: ${dustType.dust_name}, id_dust_type: ${dustType.id_dust_type}`);
        } else {
          console.error(`Dust Type not found for id_dust_type: ${dustTypeId}`);
        }
      });
    });

    console.log('Updated Selected Dust Types:', updatedSelectedDustTypes);
    setSelectedDustTypes(updatedSelectedDustTypes);
  };

  // Handle blur event
  const handleBlur = () => {
    const selectedValues = Object.values(selectedDustTypes).flat().map(Number);
    onChange(selectedValues);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20%', // width of the parent container
        '@media (max-width: 800px)': {
          width: '30%' // Change width to 90% when the screen width is less than 546px
        }
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth sx={{ m: 1 , ml: 4}}>
        <InputLabel id="label-dust-type">Select Dust Type</InputLabel>
        <Select
          labelId="label-dust-type"
          id="select-dust-type"
          value={typesInputValue[0] || ''}
          label="Select Dust Type"
          onChange={(e: SelectChangeEvent<string | string[]>) => handleDropDownChange(e.target.value)}
          onBlur={handleBlur}
        >
          {/* Mapping sorted dust types */}
          {sortedDustTypesData.map((type) => (
            <MenuItem key={type.id_dust_type.join()} value={type.id_dust_type.join(',')}>
              {type.dust_name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DustType; // Exporting DustType component
