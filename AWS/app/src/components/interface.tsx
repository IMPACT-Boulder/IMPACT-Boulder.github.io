// interface.tsx
import React, { useState, useEffect } from 'react';
import DataInputControl from './DataInputControl'; // Import DataInputControl component
import DustPlot from './plot'; // Import DustPlot component
import DataTable from './DataTable'; // Import DataTable component
import { DataItem } from './types'; // Import DataItem interface
import '../styles/App.css'; // Import CSS styles

const Page: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]); // State hook for data

  // Function to handle data update
  const handleDataUpdate = (newData: any[]) => {
    setData(newData as DataItem[]); // Update data state with new data
  };

  useEffect(() => {
    console.log('Data in Page component:', data); // Log data when it changes
  }, [data]);

  return (
    <div id='interface'> {/* Interface container */}
      {/* Data input controls */}
      <DataInputControl onDataUpdate={handleDataUpdate} /> {/* Pass handleDataUpdate as prop */}
      <DustPlot data={data} numberOfDataValues={data.length} /> {/* Pass data and data length as props */}
      {/* Data table */}
      <DataTable data={data} /> {/* Pass data as prop */}
    </div>
  );
};

export default Page; // exporting Page component