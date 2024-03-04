import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import '../styles/Table.css';

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
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

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleColumnChange = (selectedColumn: string) => {
    if (selectedColumns.includes(selectedColumn)) {
      setSelectedColumns(selectedColumns.filter((column) => column !== selectedColumn));
    } else {
      setSelectedColumns([...selectedColumns, selectedColumn]);
    }
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
    'Experiment Name',
  ];

  const isAllSelected = selectedColumns.length === columnOptions.length;

  return (
    <div id="table_div">
      <h2>Data Table</h2>
      <Box sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'row' }}>
        <FormControl sx={{ mr: 1 }}>
          <InputLabel id="label-sort-by">Sort by</InputLabel>
          <Select
            labelId="label-sort-by"
            id="select-sort-by"
            value={sortColumn}
            label="Sort by"
            onChange={(e: SelectChangeEvent<string>) => setSortColumn(e.target.value)}
          >
            {columnOptions.map((column) => (
              <MenuItem key={column} value={column}>
                {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSortToggle} id="table_button">
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </Button>
        <FormControl sx={{ minWidth: 120, marginLeft: 1 }}>
          <InputLabel id="label-select-columns">Select Columns</InputLabel>
          <Select
            labelId="label-select-columns"
            id="select-columns"
            multiple
            label="Select Columns"
            value={isAllSelected ? ['All'] : selectedColumns}
            onChange={(e: SelectChangeEvent<string[]>) => {
              if (e.target.value && e.target.value.includes('All')) {
                setSelectedColumns(columnOptions);
              } else {
                setSelectedColumns(e.target.value || []);
              }
            }}
            renderValue={(selected: string[]) => (selected.includes('All') ? 'All' : selected.join(', '))}
          >
            <MenuItem key="All" value="All">
              All
            </MenuItem>
            {columnOptions.map((column) => (
              <MenuItem key={column} value={column}>
                {column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <table>
        <thead>
          <tr>
            {selectedColumns.map((column) => (
              <th key={column}>{column === 'Dust Name' ? 'Dust Type' : column === 'Tag' ? 'Experiment Name' : column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {selectedColumns.map((column) => (
              <td key={column}>
                {column === 'Dust Name' ? item['Dust Name'] : column === 'Experiment Name' ? item['Tag'] : item[column]}
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
