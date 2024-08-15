import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete } from '@mui/material';
import { ipUrl } from './Config'; // Import the URL from the config file

interface TagDropdownProps {
  onChange: (value: string) => void;
  selectedTag: string;
  selectedGroup: string;
  selectedDustType: number[];
}

const TagDropdown: React.FC<TagDropdownProps> = ({ onChange, selectedTag, selectedGroup, selectedDustType }) => {
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputLabel, setInputLabel] = useState<string>('Experiment Names');
  const [textFieldLabel, setTextFieldLabel] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTagNames = async () => {
      setLoading(true); // Start loading
      try {
        console.log('Selected Group:', selectedGroup);
        const response = await fetch(`${ipUrl}/api/set_dust_type`, { // Use ipUrl here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedDustType, selectedGroup }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        const fetchedTagNames = data.tag_names.map((item: any) => item.tag);
        console.log('Processed Tag Names:', fetchedTagNames);
        setTagNames(fetchedTagNames);

        // Deselect tag if it does not match the filtered results
        if (selectedTag && !fetchedTagNames.includes(selectedTag)) {
          onChange('');
        }
      } catch (error) {
        console.error('Error fetching tag names:', error);
        setError('Failed to fetch tag names');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTagNames();
  }, [selectedGroup, selectedDustType, selectedTag, onChange]);

  const handleTagChange = (value: string) => {
    onChange(value);
  };

  const handleBoxClick = () => {
    setInputLabel('');
    setTextFieldLabel('Experiment Names');
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
      <FormControl fullWidth sx={{ m: 1, ml: 9, mr: 2 }}>
        <InputLabel id="label-tag-names">{inputLabel}</InputLabel>
        <Autocomplete
          id="tag-dropdown"
          options={tagNames}
          value={selectedTag || ''}
          onChange={(_, value) => handleTagChange(value as string)}
          inputValue={searchQuery}
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={textFieldLabel}
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

export default TagDropdown;
