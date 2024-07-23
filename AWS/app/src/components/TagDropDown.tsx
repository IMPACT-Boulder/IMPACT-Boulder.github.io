// tagDropDown.tsx

import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import Box from '@mui/material/Box'; // Import Box component from Material-UI
import TextField from '@mui/material/TextField'; // Import TextField component from Material-UI
import FormControl from '@mui/material/FormControl'; // Import FormControl component from Material-UI
import InputLabel from '@mui/material/InputLabel'; // Import InputLabel component from Material-UI
import FormHelperText from '@mui/material/FormHelperText'; // Import FormHelperText component from Material-UI
import { Autocomplete } from '@mui/material'; // Import Autocomplete component from Material-UI

interface TagDropdownProps {
    onChange: (value: string) => void; // Function to handle tag change
    selectedTag: string; // Currently selected tag
    selectedGroup: string; // Currently selected group
    tagNames: string[];
}

const TagDropdown: React.FC<TagDropdownProps> = ({ onChange, selectedTag, selectedGroup }) => {
    const [tagNames, setTagNames] = useState<string[]>([]); // State to store tag names
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [searchQuery, setSearchQuery] = useState<string>(''); // State to handle search query
    const [inputLabel, setInputLabel] = useState<string>('Experiment Names'); // State for input label
    const [textFieldLabel, setTextFieldLabel] = useState<string>(''); // State for text field label

    useEffect(() => {
        const fetchTagNames = async () => {
            try {
                console.log('Selected Group:', selectedGroup); // Log selected group name
                if (!selectedGroup) return; // Do not fetch tag names if no group is selected
                // Fetch tag names based on the selected group
                const response = await fetch(`https://10.247.29.20:3000/api/tag_names?selectedGroup=${selectedGroup}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data: { tag: string }[] = await response.json(); // Extract tag names from response
                const fetchedTagNames = data.map((item) => item.tag); // Extract tag names from data
                console.log('Processed Tag Names:', fetchedTagNames); // Log processed tag names
                setTagNames(fetchedTagNames); // Set tag names into state
            } catch (error) {
                console.error('Error fetching tag names:', error); // Log error if fetching tag names fails
                setError('Failed to fetch tag names'); // Set error state
            }
        };

        fetchTagNames(); // Fetch tag names when selectedGroup changes
    }, [selectedGroup]); // Dependency array ensures the effect runs when selectedGroup changes

    const handleTagChange = (value: string) => {
        onChange(value); // Handle tag change
    };

    const handleBoxClick = () => {
        setInputLabel(''); // Clear input label
        setTextFieldLabel('Experiment Names'); // Set text field label
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
            onClick={handleBoxClick} // Handle click event on box
        >
            <FormControl fullWidth sx={{ m: 1, ml: 9 , mr: 2}}>
                <InputLabel id="label-tag-names">{inputLabel}</InputLabel> 
                <Autocomplete
                    id="tag-dropdown"
                    options={tagNames}
                    value={selectedTag || ''}
                    onChange={(_, value) => handleTagChange(value as string)} // Handle tag change
                    inputValue={searchQuery} // Set input value
                    onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)} // Handle input change
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={textFieldLabel} // Set text field label
                            variant="outlined"
                            error={!!error} // Set error state
                            helperText={error} // Display error message
                            // InputLabelProps={{ shrink: true }} // Shrink input label
                            fullWidth //TextField takes full width
                        />
                    )}
                />
                <FormHelperText></FormHelperText>
            </FormControl>
        </Box>
    );
};

export default TagDropdown; // Export TagDropdown component as default

