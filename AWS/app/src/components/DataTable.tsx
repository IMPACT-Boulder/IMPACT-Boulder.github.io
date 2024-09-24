import React, { useState } from 'react'; // Importing React and the useState hook
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout
import MenuItem from '@mui/material/MenuItem'; // Importing MenuItem component for dropdown options
import FormControl from '@mui/material/FormControl'; // Importing FormControl component to wrap form fields
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importing Select component for dropdowns
import InputLabel from '@mui/material/InputLabel'; // Importing InputLabel component for labeling dropdowns
import Button from '@mui/material/Button'; // Importing Button component from Material-UI
import '../styles/Table.css'; // Importing CSS for styling the DataTable component

/**
 * Props for the DataTable component.
 * 
 * @interface DataTableProps
 * @property {any[]} data - Array of data objects to be displayed in the table.
 */
interface DataTableProps {
  data: any[]; // Data to be rendered in the table
}

/**
 * DataTable component.
 * 
 * This component renders a data table with sorting functionality and a dynamic selection of columns.
 * Users can sort by a chosen column, toggle the sort order, and select which columns to display.
 * The data can also be downloaded as a CSV file.
 * 
 * @component
 * @param {DataTableProps} props - The props for the DataTable component.
 * @returns {JSX.Element} The rendered DataTable component.
 */
const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // State for the sort order ('asc' for ascending, 'desc' for descending)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // State for the column by which the table is sorted
  const [sortColumn, setSortColumn] = useState<string>('Trace Number');

  // State for the columns that are selected to be shown in the table
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'Trace Number',
    'Velocity (km/s)',
    'Mass (kg)',
    'Estimate Quality',
    'Radius (m)',
    'Charge (C)',
    'Time',
    'Dust Name',
    'Experiment Name', // Previously 'Tag', renamed to 'Experiment Name'
  ]);

  /**
   * Toggles the sort order between ascending and descending.
   */
  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle between 'asc' and 'desc'
  };

  /**
   * Sorts the data based on the selected sort column and order.
   * 
   * @returns {any[]} The sorted data array.
   */
  const sortedData = data.slice().sort((a, b) => {
    const compareValueA = a[sortColumn];
    const compareValueB = b[sortColumn];

    // Special handling for sorting by Time (date strings)
    if (sortColumn === 'Time') {
      const dateA = new Date(compareValueA);
      const dateB = new Date(compareValueB);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      // Default numeric comparison for other columns
      return sortOrder === 'asc' ? compareValueA - compareValueB : compareValueB - compareValueA;
    }
  });

  // Options for columns available for selection
  const columnOptions = [
    'Trace Number',
    'Velocity (km/s)',
    'Mass (kg)',
    'Estimate Quality',
    'Radius (m)',
    'Charge (C)',
    'Time',
    'Dust Name',
    'Experiment Name',
  ];

  // Check if all columns are selected
  const isAllSelected = selectedColumns.length === columnOptions.length;

  /**
   * Converts the data array into a CSV string format.
   * 
   * @param {any[]} arr - The data array to convert to CSV.
   * @returns {string} The CSV formatted string.
   */
  const convertToCSV = (arr: any[]): string => {
    if (arr.length === 0) return '';
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(arr[0]); // Get column names (keys) from the first object
    const csvColumnHeader = keys.join(columnDelimiter); // Create CSV column headers
    const csvStr = arr.map((row) => keys.map((key) => row[key]).join(columnDelimiter)).join(lineDelimiter); // Create CSV rows
    return `${csvColumnHeader}${lineDelimiter}${csvStr}`; // Return complete CSV string
  };

  /**
   * Handles downloading the data as a CSV file.
   */
  const handleDownload = () => {
    if (data && data.length > 0) {
      try {
        const csvData = convertToCSV(data); // Convert data to CSV format
        const blob = new Blob([csvData], { type: 'text/csv' }); // Create a Blob with the CSV data
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
        const a = document.createElement('a'); // Create an anchor element
        a.href = url;
        a.download = 'data.csv'; // Set the download filename
        document.body.appendChild(a); // Append the anchor to the body
        a.click(); // Simulate a click to download the file
        document.body.removeChild(a); // Remove the anchor element
      } catch (error) {
        console.error('Error converting data to CSV:', error); // Log any errors
      }
    } else {
      console.error('No data available to download.'); // Log error if no data is available
    }
  };

  /**
   * Reorders the columns to place the sort column first.
   * 
   * @returns {string[]} The reordered array of column names.
   */
  const getOrderedColumns = () => {
    const otherColumns = selectedColumns.filter(column => column !== sortColumn); // Filter out the sort column
    return [sortColumn, ...otherColumns]; // Return an array with the sort column first
  };

  return (
    <div id="table_div"> {/* Main container for the data table */}
      {/* Table Content */}
      <div id="table_content"> {/* Container for table controls and the table */}
        {/* Controls for sorting and selecting columns */}
        <Box sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'row' }}> {/* Layout Box for the controls */}
          {/* Sort by Dropdown */}
          <FormControl sx={{ mr: 1 }}>
            <InputLabel id="label-sort-by">Sort by</InputLabel>
            <Select
              labelId="label-sort-by"
              id="select-sort-by"
              value={sortColumn} // Current selected sort column
              label="Sort by"
              onChange={(e: SelectChangeEvent<string>) => setSortColumn(e.target.value)} // Handle column selection
            >
              {selectedColumns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column} {/* Display name mapping */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Button for toggling the sort order */}
          <Button variant="contained" onClick={handleSortToggle} id="table_button">
            Sort {sortOrder === 'asc' ? 'Desc' : 'Asc'} {/* Display current sort order */}
          </Button>
          {/* Select Columns Dropdown */}
          <FormControl sx={{ minWidth: 120, marginLeft: 1 }}>
            <InputLabel id="label-select-columns">Select Columns</InputLabel>
            <Select
              labelId="label-select-columns"
              id="select-columns"
              multiple
              label="Select Columns"
              value={isAllSelected ? ['All'] : selectedColumns} // If all columns are selected, show 'All'
              onChange={(e: SelectChangeEvent<typeof selectedColumns>) => {
                const value = e.target.value;
                if (typeof value === 'string') return; // Ensure it's an array
                if (value && value.includes('All')) {
                  setSelectedColumns(columnOptions); // Select all columns if 'All' is chosen
                } else {
                  setSelectedColumns(value); // Update selected columns
                }
              }}
              renderValue={(selected: string[]) => (selected.includes('All') ? 'All' : selected.join(', '))} // Render selected columns as string
            >
              <MenuItem key="All" value="All"> {/* Option to select all columns */}
                All
              </MenuItem>
              {columnOptions.map((column) => (
                <MenuItem key={column} value={column}>
                  {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column} {/* Label mapping */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Download Button */}
          <Button type="button" variant="outlined" onClick={handleDownload} id="download">
            Download Data as CSV {/* Button to trigger CSV download */}
          </Button>
        </Box>
        {/* Data Table */}
        <table> {/* Table element for displaying data */}
          <thead>
            <tr>
              {getOrderedColumns().map((column) => (
                <th key={column}>
                  {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column} {/* Display name mapping */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}> {/* Row for each data item */}
                {getOrderedColumns().map((column) => (
                  <td key={column}>
                    {column === 'Dust Name' ? item['Dust Name'] : column === 'Experiment Name' ? item['Tag'] : item[column]} {/* Data cell */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable; // Export the DataTable component as the default export
