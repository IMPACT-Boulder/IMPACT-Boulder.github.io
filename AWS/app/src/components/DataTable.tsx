//DataTable.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('Trace Number');

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleColumnChange = (selectedColumn: string) => {
    setSortColumn(selectedColumn);
  };

  const sortedData = data.slice().sort((a, b) => {
    const compareValueA = a[sortColumn];
    const compareValueB = b[sortColumn];

    if (sortOrder === 'asc') {
      return compareValueA - compareValueB;
    } else {
      return compareValueB - compareValueA;
    }
  });

  const columnOptions = [
    'Trace Number',
    'Velocity (km/s)',
    'Mass (kg)',
    'Estimate Quality',
    'Radius (m)',
    'Charge (C)',
    'Time',
    'Dust Name', 
    'Tag',
  ];

  // Dynamically reorder columns based on the selected sorting column
  const reorderedColumns = [
    sortColumn,
    ...columnOptions.filter((column) => column !== sortColumn),
  ];

  return (
    <div id="table_div">
      <h2>Data Table</h2>
      <Box sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'row' }}>
        <FormControl sx={{ mr: 1 }}>
          <InputLabel id="label-sort-by">Sort by</InputLabel>
          <Select
            labelId="label-sort-by"
            id="select-sort-by"
            value={'Trace Number'} // Set the default sort column here
            label="Sort by"
            onChange={(e: SelectChangeEvent<string>) => handleColumnChange(e.target.value)}
          >
            {columnOptions.map((column) => (
              <MenuItem key={column} value={column}>
                {column === 'Dust Name' ? 'Dust Type' : column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSortToggle} id="table_button">
          Sort Ascending
        </Button>
      </Box>
      <table>
        <thead>
          <tr>
            {columnOptions.map((column) => (
              <th key={column}>{column === 'Dust Name' ? 'Dust Type' : column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {columnOptions.map((column) => (
                <td key={column}>
                  {column === 'Dust Name' ? item['Dust Name'] : column === 'Tag' ? item['Tag'] : item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DataTable;