// GroupName.tsx

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { sortBy } from 'lodash';

interface GroupNameProps {
  onChange: (groups: string[]) => void;
  selectedGroups: string[];
}


const GroupName: React.FC<GroupNameProps> = ({ onChange, selectedGroups }) => {
  const [groupsInputValue, setGroupsInputValue] = useState<string[]>(selectedGroups.map(String));
  const [groupNames, setGroupNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroupNames = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/group_names');
        const data: { group_names: string[] }[] = await response.json();

        // Log the received data
        console.log('Received raw group names data:', data);

        // Assuming the data structure is an array of objects with a 'group_names' property
        const extractedGroupNames = data.map((item) => item.group_names).flat();

        // Log the extracted group names
        console.log('Extracted group names:', extractedGroupNames);

        // Set the group names to state
        const sortedGroupNames = sortBy(extractedGroupNames);
        setGroupNames(sortedGroupNames);
      } catch (error) {
        console.error('Error fetching group names:', error);
      }
    };

    fetchGroupNames();
  }, []);


  const handleDropDownChange = (value: string | string[]) => {
    setGroupsInputValue(Array.isArray(value) ? value : [value]);
  };
  
  

  const handleBlur = () => {
    onChange(groupsInputValue);
  };
  

  //console.log('groupNames:', groupNames);
  console.log('groupsInputValue:', groupsInputValue);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {groupNames.length > 0 && (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="label-group-name">Experiment Group</InputLabel>
          <Select
            labelId="label-group-name"
            id="select-group-name"
            value={groupsInputValue[0] || ''}
            label="Experiment Group"
            onChange={(e: SelectChangeEvent<string | string[]>) => handleDropDownChange(e.target.value)}
            onBlur={handleBlur}
          >
            {groupNames.map((groupName, index) => (
              <MenuItem key={groupName} value={groupName}>
                {groupName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      )}
    </Box>
  );
};

export default GroupName;