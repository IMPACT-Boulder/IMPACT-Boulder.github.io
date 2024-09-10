import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import '../styles/Table.css';

interface DataTableProps {
  data: any[]; // Define prop types for DataTable component
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // State hooks for sorting and selecting columns
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('Trace Number');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'Trace Number',
    'Velocity (km/s)',
    'Mass (kg)',
    'Estimate Quality',
    'Radius (m)',
    'Charge (C)',
    'Time',
    'Dust Name',
    'Experiment Name', // changed from 'Tag'
  ]);

  // Function to toggle sorting order
  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Sorting data based on sortColumn and sortOrder
  const sortedData = data.slice().sort((a, b) => {
    const compareValueA = a[sortColumn];
    const compareValueB = b[sortColumn];

    if (sortColumn === 'Time') {
      // Parse the date strings into Date objects
      const dateA = new Date(compareValueA);
      const dateB = new Date(compareValueB);
      // Compare Date objects
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      // Default numeric comparison
      return sortOrder === 'asc' ? compareValueA - compareValueB : compareValueB - compareValueA;
    }
  });

  // Options for selecting columns
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

  // Add the convertToCSV function here
  const convertToCSV = (arr: any[]): string => {
    if (arr.length === 0) return '';
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(arr[0]);
    const csvColumnHeader = keys.join(columnDelimiter);
    const csvStr = arr.map((row) => keys.map((key) => row[key]).join(columnDelimiter)).join(lineDelimiter);
    return `${csvColumnHeader}${lineDelimiter}${csvStr}`;
  };

  // Function to handle data download as CSV
  const handleDownload = () => {
    if (data && data.length > 0) {
      try {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error converting data to CSV:', error);
      }
    } else {
      console.error('No data available to download.');
    }
  };

  // Function to reorder columns to place the sort column first
  const getOrderedColumns = () => {
    const otherColumns = selectedColumns.filter(column => column !== sortColumn);
    return [sortColumn, ...otherColumns];
  };

  return (
    <div id="table_div">
      {/* Header */}
      {/* <h2>Data Table</h2> */}
      <div id="table_content">
        {/* Sort and Select Column controls */}
        <Box sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'row' }}>
          {/* Sort by Dropdown */}
          <FormControl sx={{ mr: 1 }}>
            <InputLabel id="label-sort-by">Sort by</InputLabel>
            <Select
              labelId="label-sort-by"
              id="select-sort-by"
              value={sortColumn}
              label="Sort by"
              onChange={(e: SelectChangeEvent<string>) => setSortColumn(e.target.value)}
            >
              {/* Mapping selected column options */}
              {selectedColumns.map((column) => (
                <MenuItem key={column} value={column}>
                  {/* Change label for specific columns */}
                  {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Button for toggling sort order */}
          <Button variant="contained" onClick={handleSortToggle} id="table_button">
            Sort {sortOrder === 'asc' ? 'Desc' : 'Asc'}
          </Button>
          {/* Select Columns Dropdown */}
          <FormControl sx={{ minWidth: 120, marginLeft: 1 }}>
            <InputLabel id="label-select-columns">Select Columns</InputLabel>
            <Select
              labelId="label-select-columns"
              id="select-columns"
              multiple
              label="Select Columns"
              value={isAllSelected ? ['All'] : selectedColumns}
              onChange={(e: SelectChangeEvent<typeof selectedColumns>) => {
                // Handle selection of all columns
                const value = e.target.value;
                if (typeof value === 'string') return;
                if (value && value.includes('All')) {
                  setSelectedColumns(columnOptions);
                } else {
                  setSelectedColumns(value);
                }
              }}
              // Render selected columns as string
              renderValue={(selected: string[]) => (selected.includes('All') ? 'All' : selected.join(', '))}
            >
              {/* Mapping column options */}
              <MenuItem key="All" value="All">
                All
              </MenuItem>
              {columnOptions.map((column) => (
                <MenuItem key={column} value={column}>
                  {/* Change label for specific columns */}
                  {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Download Button */}
          <Button type="button" variant="outlined" onClick={handleDownload} id="download">
            Download Data as CSV
          </Button>
        </Box>
        {/* Table */}
        <table>
          <thead>
            <tr>
              {/* Mapping ordered columns for table headers */}
              {getOrderedColumns().map((column) => (
                <th key={column}>
                  {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Mapping sorted data for table rows */}
            {sortedData.map((item, index) => (
              <tr key={index}>
                {/* Mapping ordered columns for table cells */}
                {getOrderedColumns().map((column) => (
                  <td key={column}>
                    {/* Change label for specific columns */}
                    {column === 'Dust Name' ? item['Dust Name'] : column === 'Experiment Name' ? item['Tag'] : item[column]}
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

export default DataTable; // Exporting DataTable component
