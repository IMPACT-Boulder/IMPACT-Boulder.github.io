import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout
import MenuItem from '@mui/material/MenuItem'; // Importing MenuItem component for dropdown items
import FormControl from '@mui/material/FormControl'; // Importing FormControl to wrap the form field
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importing Select component for dropdown
import InputLabel from '@mui/material/InputLabel'; // Importing InputLabel to label the dropdown
import FormHelperText from '@mui/material/FormHelperText'; // Importing FormHelperText to display errors or helper messages
import { ipUrl } from './Config'; // Importing the IP URL from the config file

/**
 * Props for the DustType component.
 * 
 * @interface DustTypeProps
 * @property {function} onChange - Callback function to handle changes to the selected dust types.
 * @property {number[]} selectedTypes - Array of currently selected dust types.
 * @property {string} selectedGroup - The currently selected experiment group for filtering.
 */
interface DustTypeProps {
  onChange: (types: number[]) => void; // Function to handle when the selected dust types change
  selectedTypes: number[]; // Array of selected dust types
  selectedGroup: string; // Currently selected experiment group
}

/**
 * Interface for representing each dust type.
 * 
 * @interface DustType
 * @property {string} dust_name - Name of the dust type.
 * @property {number[]} dust_type - Array of dust type IDs.
 */
interface DustType {
  dust_name: string; // The name of the dust type
  dust_type: number[]; // Array of dust type IDs
}

/**
 * DustType component.
 * 
 * This component provides a dropdown menu that allows users to select one or more dust types.
 * The available dust types are fetched from the server based on the selected experiment group.
 * 
 * @component
 * @param {DustTypeProps} props - The props for the DustType component.
 * @returns {JSX.Element} The rendered DustType component.
 */
const DustType: React.FC<DustTypeProps> = ({ onChange, selectedTypes, selectedGroup }) => {
  // State for managing the input values (as strings) for the dropdown
  const [typesInputValue, setTypesInputValue] = useState<string[]>(selectedTypes.map(String));

  // State for storing the fetched dust types from the server
  const [dustTypes, setDustTypes] = useState<DustType[]>([]);

  // State for tracking selected dust types, grouped by their name
  const [selectedDustTypes, setSelectedDustTypes] = useState<{ [key: string]: string[] }>({});

  /**
   * useEffect hook to fetch dust types whenever the selected group changes.
   */
  useEffect(() => {
    const fetchDustTypes = async () => {
      try {
        // Fetch dust types from the server based on the selected group
        const response = await fetch(`${ipUrl}/api/set_dust_type`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedGroup }),
        });

        // Throw an error if the request fails
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        // Process the response data
        const data = await response.json();
        const fetchedDustTypes: DustType[] = data.dust_types.map((item: { dust_name: string; dust_type: number[] }) => ({
          dust_name: item.dust_name,
          dust_type: item.dust_type,
        }));

        console.log('Processed Dust Types:', fetchedDustTypes);
        setDustTypes(fetchedDustTypes); // Set the dust types in state

        // Deselect dust type if it does not match the filtered results
        const selectedTypeIds = selectedTypes.map(String); // Convert selected types to string
        const validTypes = fetchedDustTypes.flatMap((item) => item.dust_type.map(String)); // Flatten fetched types to string
        const validSelectedTypes = selectedTypeIds.filter((typeId) => validTypes.includes(typeId)); // Filter valid selected types

        // If any selected type is invalid, update the input value and onChange
        if (selectedTypeIds.length !== validSelectedTypes.length) {
          setTypesInputValue(validSelectedTypes); // Update the input value in state
          onChange(validSelectedTypes.map(Number)); // Call onChange with the valid types
        }
      } catch (error) {
        console.error('Error fetching dust types:', error); // Log any error encountered during the fetch
      }
    };

    fetchDustTypes(); // Fetch dust types when selectedGroup or selectedTypes change
  }, [selectedGroup, selectedTypes, onChange]);

  /**
   * Handle changes to the dropdown value.
   * 
   * @param {string | string[]} value - The selected dust type(s).
   */
  const handleDropDownChange = (value: string | string[]) => {
    const valuesArray = Array.isArray(value) ? value : [value]; // Ensure the value is an array
    setTypesInputValue(valuesArray); // Update the input value in state

    const updatedSelectedDustTypes: { [key: string]: string[] } = {}; // Object to hold selected dust types

    // Iterate over each selected value and update the selected dust types
    valuesArray.forEach((val) => {
      const dustTypeIds = val.split(','); // Split value into individual dust type IDs

      dustTypeIds.forEach((dustTypeId) => {
        const dustType = dustTypes.find((type) => type.dust_type.includes(Number(dustTypeId))); // Find the matching dust type

        if (dustType) {
          // Add the dust type to the selected dust types object
          if (!updatedSelectedDustTypes[dustType.dust_name]) {
            updatedSelectedDustTypes[dustType.dust_name] = dustType.dust_type.map(String);
          }
          console.log(`Selected Dust Type: ${dustType.dust_name}, id_dust_type: ${dustType.dust_type}`);
        } else {
          console.error(`Dust Type not found for id_dust_type: ${dustTypeId}`); // Log error if dust type not found
        }
      });
    });

    console.log('Updated Selected Dust Types:', updatedSelectedDustTypes); // Log updated selected dust types
    setSelectedDustTypes(updatedSelectedDustTypes); // Update the selected dust types in state
  };

  /**
   * Handle blur event (when the dropdown loses focus).
   * 
   * Converts the selected dust types into a flat array and passes them to the onChange callback.
   */
  const handleBlur = () => {
    const selectedValues = Object.values(selectedDustTypes).flat().map(Number); // Flatten and convert to numbers
    onChange(selectedValues); // Call onChange with the selected values
  };

  return (
    <Box
      component="form" // Render Box as a form
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20%',
        '@media (max-width: 800px)': {
          width: '30%',
        },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth sx={{ m: 1, ml: 4 }}> {/* Form control to hold the dropdown */}
        <InputLabel id="label-dust-type">Select Dust Type</InputLabel> {/* Label for the dropdown */}
        <Select
          labelId="label-dust-type"
          id="select-dust-type"
          value={typesInputValue[0] || ''} // Set the current value of the dropdown
          label="Select Dust Type"
          onChange={(e: SelectChangeEvent<string | string[]>) => handleDropDownChange(e.target.value)} // Handle change event
          onBlur={handleBlur} // Handle blur event
        >
          {/* Render MenuItem for each dust type */}
          {dustTypes.map((type) => (
            <MenuItem key={type.dust_type.join(',')} value={type.dust_type.join(',')}>
              {type.dust_name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText> {/* Placeholder for additional form helper text */}
      </FormControl>
    </Box>
  );
};

export default DustType; // Export the DustType component as the default export
