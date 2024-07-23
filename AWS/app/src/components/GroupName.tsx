// GroupName.tsx
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@mui/material';
import { sortBy } from 'lodash';

interface GroupNameProps {
    onChange: (groups: string) => void;
    onGroupChange: (group: string) => void; // Callback for updating selected group
    selectedGroups: string; // Change to single string
}

const GroupName: React.FC<GroupNameProps> = ({ onChange, onGroupChange, selectedGroups }) => {
    // State hooks for group names, error, search query, input label, and text field label
    const [groupNames, setGroupNames] = useState<string[]>([]);
    const [error, setError] = useState<string | null>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [inputLabel, setInputLabel] = useState<string>('Experiment Groups');
    const [textFieldLabel, setTextFieldLabel] = useState<string>('');

    // Function to handle error in child component
    const handleChildError = (error: string) => {
        console.error('Error in child component:', error);
        onChange('');
        setError(error);
    };

    useEffect(() => {
        const fetchGroupNames = async () => {
            try {
                const response = await fetch('https://10.247.29.20:3000/api/group_names');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data: { group_names: string[] }[] = await response.json();
                const extractedGroupNames = data.map((item) => item.group_names).flat();
                const sortedGroupNames = sortBy(extractedGroupNames);
                setGroupNames(sortedGroupNames);
            } catch (error: any) {
                console.error('Error fetching group names:', error);
                setError('Failed to fetch group names');
                handleChildError(error.message);
            }
        };

        fetchGroupNames();
    }, []);

    // Function to handle group change
    const handleGroupChange = (value: string) => {
        onChange(value);
        onGroupChange(value);
    };

    // Function to handle box click
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
            width: '20%', // width of the parent container
            '@media (max-width: 800px)': {
              width: '30%' // Change width to 90% when the screen width is less than 546px
            }
          }}
          noValidate
          autoComplete="off"
          onClick={handleBoxClick}
        >
          <FormControl fullWidth sx={{ m: 1 , ml: 6}} >
            {/* <InputLabel id="label-group-name">Experiment Group</InputLabel> */}
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
                  label="Experiment Group"
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                  fullWidth // TextField takes full width
                />
              )}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
        </Box>
    );
};

export default GroupName; // exporting GroupName component