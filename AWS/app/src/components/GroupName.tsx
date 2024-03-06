import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@mui/material';
import { sortBy } from 'lodash';

interface GroupNameProps {
    onChange: (groups: string[]) => void;
    selectedGroups: string[]; // Corrected prop name
}

const GroupName: React.FC<GroupNameProps> = ({ onChange, selectedGroups }) => { // Fixed prop name here as well
    const [groupNames, setGroupNames] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [inputLabel, setInputLabel] = useState<string>('Experiment Groups');
    const [textFieldLabel, setTextFieldLabel] = useState<string>('');

    useEffect(() => {
        const fetchGroupNames = async () => {
            try {
                const response = await fetch('https://10.247.29.177:3000/api/group_names');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data: { group_names: string[] }[] = await response.json();
                const extractedGroupNames = data.map((item) => item.group_names).flat();
                const sortedGroupNames = sortBy(extractedGroupNames);
                setGroupNames(sortedGroupNames);
            } catch (error) {
                console.error('Error fetching group names:', error);
                setError('Failed to fetch group names');
            }
        };

        fetchGroupNames();
    }, []);

    const handleGroupChange = (value: string) => {
        onChange([value]);
    };

    const handleBoxClick = () => {
        setInputLabel('');
        setTextFieldLabel('Experiment Groups');
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '20ch' },
            }}
            noValidate
            autoComplete="off"
            onClick={handleBoxClick}
        >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="label-group-name">{inputLabel}</InputLabel>
                <Autocomplete
                    id="group-dropdown"
                    options={groupNames}
                    value={selectedGroups}
                    onChange={(event, value) => handleGroupChange(value as string)}
                    inputValue={searchQuery}
                    onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={textFieldLabel}
                            variant="outlined"
                            error={!!error}
                            helperText={error}
                            InputLabelProps={{ shrink: true }}
                        />
                    )}
                />
                <FormHelperText></FormHelperText>
            </FormControl>
        </Box>
    );
};

export default GroupName;
