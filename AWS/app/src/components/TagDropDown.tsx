//TagDropDown.tsx
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@mui/material';

interface TagDropdownProps {
  onChange: (value: string) => void;
  selectedTag: string;
}

const TagDropdown: React.FC<TagDropdownProps> = ({ onChange, selectedTag }) => {
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputLabel, setInputLabel] = useState<string>('Experiment Names');
  const [textFieldLabel, setTextFieldLabel] = useState<string>('');

  const handleChildError = (error: string) => {
    // Handle the error in the parent component
    console.error('Error in child component:', error);
    // Pass the error to the parent component
    onChange([]);
    setError(error);
};

  useEffect(() => {
    const fetchTagNames = async () => {
      try {
        const response = await fetch('https://10.247.28.163:3000/api/tag_names?page=1');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: { tag: string }[] = await response.json();
        const fetchedTagNames = data.map((item) => item.tag);
        console.log('Processed Tag Names:', fetchedTagNames);
        setTagNames(fetchedTagNames);
      } catch (error: any) {
        console.error('Error fetching tag names:', error);
        setError('Failed to fetch tag names');
        // Call the error handler function
        handleChildError(error.message);
      }
    };

    fetchTagNames();
  }, []);

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
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
      onClick={handleBoxClick}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label-tag-names">{inputLabel}</InputLabel>
        <Autocomplete
          id="tag-dropdown"
          options={tagNames}
          value={selectedTag || ''}
          onChange={(event, value) => handleTagChange(value as string)}
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

export default TagDropdown;
