import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { ipUrl } from './Config'; // Import the URL from the config file

interface DustTypeProps {
  onChange: (types: number[]) => void;
  selectedTypes: number[];
  selectedGroup: string;
}

interface DustType {
  dust_name: string;
  dust_type: number[];
}

const DustType: React.FC<DustTypeProps> = ({ onChange, selectedTypes, selectedGroup }) => {
  const [typesInputValue, setTypesInputValue] = useState<string[]>(selectedTypes.map(String));
  const [dustTypes, setDustTypes] = useState<DustType[]>([]);
  const [selectedDustTypes, setSelectedDustTypes] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchDustTypes = async () => {
      try {
        const response = await fetch(`${ipUrl}/api/set_dust_type`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedGroup }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        const fetchedDustTypes: DustType[] = data.dust_types.map((item: { dust_name: string; dust_type: number[] }) => ({
          dust_name: item.dust_name,
          dust_type: item.dust_type,
        }));
        console.log('Processed Dust Types:', fetchedDustTypes);
        setDustTypes(fetchedDustTypes);

        // Deselect dust type if it does not match the filtered results
        const selectedTypeIds = selectedTypes.map(String);
        const validTypes = fetchedDustTypes.flatMap((item) => item.dust_type.map(String));
        const validSelectedTypes = selectedTypeIds.filter((typeId) => validTypes.includes(typeId));
        if (selectedTypeIds.length !== validSelectedTypes.length) {
          setTypesInputValue(validSelectedTypes);
          onChange(validSelectedTypes.map(Number));
        }
      } catch (error) {
        console.error('Error fetching dust types:', error);
      }
    };

    fetchDustTypes();
  }, [selectedGroup, selectedTypes, onChange]);

  const handleDropDownChange = (value: string | string[]) => {
    const valuesArray = Array.isArray(value) ? value : [value];
    setTypesInputValue(valuesArray);

    const updatedSelectedDustTypes: { [key: string]: string[] } = {};

    valuesArray.forEach((val) => {
      const dustTypeIds = val.split(',');

      dustTypeIds.forEach((dustTypeId) => {
        const dustType = dustTypes.find((type) => type.dust_type.includes(Number(dustTypeId)));

        if (dustType) {
          if (!updatedSelectedDustTypes[dustType.dust_name]) {
            updatedSelectedDustTypes[dustType.dust_name] = dustType.dust_type.map(String);
          }
          console.log(`Selected Dust Type: ${dustType.dust_name}, id_dust_type: ${dustType.dust_type}`);
        } else {
          console.error(`Dust Type not found for id_dust_type: ${dustTypeId}`);
        }
      });
    });

    console.log('Updated Selected Dust Types:', updatedSelectedDustTypes);
    setSelectedDustTypes(updatedSelectedDustTypes);
  };

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
        width: '20%',
        '@media (max-width: 800px)': {
          width: '30%',
        },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth sx={{ m: 1, ml: 4 }}>
        <InputLabel id="label-dust-type">Select Dust Type</InputLabel>
        <Select
          labelId="label-dust-type"
          id="select-dust-type"
          value={typesInputValue[0] || ''}
          label="Select Dust Type"
          onChange={(e: SelectChangeEvent<string | string[]>) => handleDropDownChange(e.target.value)}
          onBlur={handleBlur}
        >
          {dustTypes.map((type) => (
            <MenuItem key={type.dust_type.join(',')} value={type.dust_type.join(',')}>
              {type.dust_name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DustType;
