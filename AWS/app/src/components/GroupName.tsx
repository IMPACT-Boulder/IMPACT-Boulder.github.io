import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@mui/material';
import { sortBy } from 'lodash';

interface GroupNameProps {
  onChange: (groups: string) => void;
  onGroupChange: (group: string) => void;
  selectedGroups: string;
}

const GroupName: React.FC<GroupNameProps> = ({ onChange, onGroupChange, selectedGroups }) => {
  const [groupNames, setGroupNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputLabel, setInputLabel] = useState<string>('Experiment Groups');
  const [textFieldLabel, setTextFieldLabel] = useState<string>('');

  useEffect(() => {
    const fetchGroupNames = async () => {
      try {
        const response = await fetch('https://10.247.28.95:3000/api/set_dust_type', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedDustType: [] }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        const extractedGroupNames = data.group_names.map((item: any) => item.group_names);
        const sortedGroupNames = sortBy(extractedGroupNames);
        setGroupNames(sortedGroupNames);
      } catch (error: any) {
        console.error('Error fetching group names:', error);
        setError('Failed to fetch group names');
      }
    };

    fetchGroupNames();
  }, []);

  const handleGroupChange = (value: string) => {
    onChange(value);
    onGroupChange(value);
  };

  const handleBoxClick = () => {
    setInputLabel('');
    setTextFieldLabel('Experiment Groups');
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
        }
      }}
      noValidate
      autoComplete="off"
      onClick={handleBoxClick}
    >
      <FormControl fullWidth sx={{ m: 1, ml: 6 }}>
        <Autocomplete
          id="group-dropdown"
          options={groupNames}
          value={selectedGroups}
          onChange={(_, value) => handleGroupChange(value as string)}
          inputValue={searchQuery}
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Experiment Groups"
              variant="outlined"
              error={!!error}
              helperText={error}
              fullWidth
            />
          )}
        />
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default GroupName;
