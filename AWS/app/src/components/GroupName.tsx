import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete } from '@mui/material';
import { sortBy } from 'lodash';
import { ipUrl } from './Config'; // Import the URL from the config file

interface GroupNameProps {
  onChange: (groups: string) => void;
  onGroupChange: (group: string) => void;
  selectedGroups: string;
  selectedDustType: number[];
}

const GroupName: React.FC<GroupNameProps> = ({ onChange, onGroupChange, selectedGroups, selectedDustType }) => {
  const [groupNames, setGroupNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroupNames = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`${ipUrl}/api/set_dust_type`, { // Use ipUrl here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedDustType, selectedGroup: selectedGroups }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        const extractedGroupNames = data.group_names.map((item: any) => item.group_names);
        const sortedGroupNames = sortBy(extractedGroupNames);
        setGroupNames(sortedGroupNames);

        // Deselect group if it does not match the filtered results
        if (selectedGroups && !sortedGroupNames.includes(selectedGroups)) {
          onChange('');
          onGroupChange('');
        }
      } catch (error: any) {
        console.error('Error fetching group names:', error);
        setError('Failed to fetch group names');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGroupNames();
  }, [selectedDustType, selectedGroups, onChange, onGroupChange]);

  const handleGroupChange = (value: string) => {
    onChange(value);
    onGroupChange(value);
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
    >
      <FormControl fullWidth sx={{ m: 1, ml: 6 }}>
        <Autocomplete
          id="group-dropdown"
          options={groupNames}
          value={selectedGroups}
          onChange={(_, value) => handleGroupChange(value as string)}
          inputValue={searchQuery}
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Experiment Groups"
              variant="outlined"
              error={!!error}
              helperText={error}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default GroupName;
