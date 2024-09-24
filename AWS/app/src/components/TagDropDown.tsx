import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete } from '@mui/material';
import { ipUrl } from './Config'; // Import the URL from the config file

/**
 * Props for the TagDropdown component.
 * 
 * @interface TagDropdownProps
 * @property {function} onChange - Function to handle changes to the selected tag.
 * @property {string} selectedTag - Currently selected tag.
 * @property {string} selectedGroup - Currently selected experiment group.
 * @property {number[]} selectedDustType - Array of selected dust types.
 */
interface TagDropdownProps {
  onChange: (value: string) => void;
  selectedTag: string;
  selectedGroup: string;
  selectedDustType: number[];
}

/**
 * TagDropdown component that allows the user to select an experiment name (tag) based on selected group and dust type.
 * 
 * This component fetches the relevant experiment tags from the API and dynamically filters them based on the selected group and dust type.
 * The user can search and select from available tags.
 * 
 * @component
 * @param {TagDropdownProps} props - The props for the component.
 * @returns {JSX.Element} The rendered dropdown component for selecting experiment tags.
 */
const TagDropdown: React.FC<TagDropdownProps> = ({ onChange, selectedTag, selectedGroup, selectedDustType }) => {
  /** State for storing the fetched tag names. */
  const [tagNames, setTagNames] = useState<string[]>([]);

  /** State to store any errors encountered while fetching tag names. */
  const [error, setError] = useState<string | null>(null);

  /** State for the search query in the input field. */
  const [searchQuery, setSearchQuery] = useState<string>('');

  /** State for the input label of the form control. */
  const [inputLabel, setInputLabel] = useState<string>('Experiment Names');

  /** State for the TextField label. */
  const [textFieldLabel, setTextFieldLabel] = useState<string>('');

  /** State to track the loading state while fetching data. */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches tag names from the server based on the selected group and dust type.
   * Automatically deselects the current tag if it is not in the fetched list.
   */
  useEffect(() => {
    const fetchTagNames = async () => {
      setLoading(true); // Start loading state
      try {
        console.log('Selected Group:', selectedGroup);
        const response = await fetch(`${ipUrl}/api/set_dust_type`, { // Make a POST request to fetch the tag names based on the selected group and dust type
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

        // Deselect the current tag if it does not match the fetched results
        if (selectedTag && !fetchedTagNames.includes(selectedTag)) {
          onChange('');
        }
      } catch (error) {
        console.error('Error fetching tag names:', error);
        setError('Failed to fetch tag names');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTagNames();
  }, [selectedGroup, selectedDustType, selectedTag, onChange]);

  /**
   * Handles changes to the selected tag in the dropdown.
   * 
   * @param {string} value - The selected tag value.
   */
  const handleTagChange = (value: string) => {
    onChange(value);
  };

  /**
   * Resets the input label and sets the TextField label when the Box component is clicked.
   */
  const handleBoxClick = () => {
    setInputLabel(''); // Clear the input label
    setTextFieldLabel('Experiment Names'); // Set the TextField label to "Experiment Names"
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
      onClick={handleBoxClick} // Attach the handleBoxClick to the Box onClick event
    >
      <FormControl fullWidth sx={{ m: 1, ml: 9, mr: 2 }}>
        <InputLabel id="label-tag-names">{inputLabel}</InputLabel>
        <Autocomplete
          id="tag-dropdown"
          options={tagNames} // Options for the dropdown
          value={selectedTag || ''} // Selected tag value
          onChange={(_, value) => handleTagChange(value as string)} // Handle tag change
          inputValue={searchQuery} // Input value for the search query
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)} // Handle changes to the search input
          loading={loading} // Indicate loading state while fetching tags
          renderInput={(params) => (
            <TextField
              {...params}
              label={textFieldLabel} // Set the label for the TextField
              variant="outlined"
              error={!!error} // Show error if there is any
              helperText={error} // Show error message if there is any
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null} {/* Show loading spinner while fetching data */}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <FormHelperText></FormHelperText> {/* Placeholder for helper text */}
      </FormControl>
    </Box>
  );
};

export default TagDropdown;
