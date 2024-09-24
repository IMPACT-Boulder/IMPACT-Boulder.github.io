import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks (useEffect, useState)
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout
import TextField from '@mui/material/TextField'; // Importing TextField component for input
import FormControl from '@mui/material/FormControl'; // Importing FormControl component for wrapping form elements
import FormHelperText from '@mui/material/FormHelperText'; // Importing FormHelperText component for form field errors
import CircularProgress from '@mui/material/CircularProgress'; // Importing CircularProgress for loading indicator
import { Autocomplete } from '@mui/material'; // Importing Autocomplete component for dropdown suggestions
import { sortBy } from 'lodash'; // Importing Lodash's sortBy function for sorting arrays
import { ipUrl } from './Config'; // Importing the URL from the config file for API calls

/**
 * Props for the GroupName component.
 * 
 * @interface GroupNameProps
 * @property {function} onChange - Callback to handle changes to the selected group name.
 * @property {function} onGroupChange - Callback to handle specific group selection changes.
 * @property {string} selectedGroups - Currently selected group name.
 * @property {number[]} selectedDustType - Currently selected dust type(s) for filtering.
 */
interface GroupNameProps {
  onChange: (groups: string) => void; // Function to call when the group is changed
  onGroupChange: (group: string) => void; // Function to call when a specific group is selected
  selectedGroups: string; // Currently selected group name
  selectedDustType: number[]; // Array of selected dust types for filtering
}

/**
 * GroupName component.
 * 
 * This component provides an autocomplete dropdown that allows the user to select experiment groups.
 * The group names are fetched from the server based on the selected dust type.
 * 
 * @component
 * @param {GroupNameProps} props - The props for the GroupName component.
 * @returns {JSX.Element} The rendered GroupName component.
 */
const GroupName: React.FC<GroupNameProps> = ({ onChange, onGroupChange, selectedGroups, selectedDustType }) => {
  // State for storing the available group names
  const [groupNames, setGroupNames] = useState<string[]>([]);

  // State for storing any errors encountered during the fetch process
  const [error, setError] = useState<string | null>(null);

  // State for the search query in the input field
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State to indicate if data is being loaded (for showing a loading spinner)
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * useEffect hook to fetch group names whenever the selected dust type or group changes.
   */
  useEffect(() => {
    const fetchGroupNames = async () => {
      setLoading(true); // Start the loading spinner
      try {
        // Send a POST request to fetch group names based on the selected dust type
        const response = await fetch(`${ipUrl}/api/set_dust_type`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedDustType, selectedGroup: selectedGroups }),
        });

        // If the response is not okay, throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        // Extract the group names from the response data
        const data = await response.json();
        const extractedGroupNames = data.group_names.map((item: any) => item.group_names);

        // Sort the group names alphabetically
        const sortedGroupNames = sortBy(extractedGroupNames);
        setGroupNames(sortedGroupNames); // Update the groupNames state with the sorted data

        // If the selected group does not match the fetched group names, reset the selection
        if (selectedGroups && !sortedGroupNames.includes(selectedGroups)) {
          onChange(''); // Reset the selected group
          onGroupChange(''); // Reset the group change handler
        }
      } catch (error: any) {
        // Log and display an error if the fetch fails
        console.error('Error fetching group names:', error);
        setError('Failed to fetch group names'); // Set the error state
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchGroupNames(); // Call the function to fetch group names
  }, [selectedDustType, selectedGroups, onChange, onGroupChange]); // Dependencies: update when selected dust type or group changes

  /**
   * Handle the selection change in the dropdown.
   * 
   * @param {string} value - The selected group name.
   */
  const handleGroupChange = (value: string) => {
    onChange(value); // Call the onChange callback
    onGroupChange(value); // Call the onGroupChange callback
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
          id="group-dropdown" // Unique ID for the dropdown
          options={groupNames} // The available group names for the dropdown
          value={selectedGroups} // The currently selected group
          onChange={(_, value) => handleGroupChange(value as string)} // Handle changes to the selected group
          inputValue={searchQuery} // The current search query value
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)} // Handle changes to the search query input
          loading={loading} // Display a loading spinner while fetching data
          renderInput={(params) => (
            <TextField
              {...params} // Pass the params from Autocomplete to the TextField
              label="Experiment Groups" // Label for the input field
              variant="outlined" // Set the variant of the TextField to "outlined"
              error={!!error} // Show error if there is any
              helperText={error} // Display helper text for the error if present
              fullWidth // Make the TextField take up the full width
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null} {/* Show loading spinner when loading */}
                    {params.InputProps.endAdornment} {/* Render the default input adornment (if any) */}
                  </>
                ),
              }}
            />
          )}
        />
        <FormHelperText></FormHelperText> {/* Placeholder for additional form helper text */}
      </FormControl>
    </Box>
  );
};

export default GroupName; // Export the GroupName component as the default export
