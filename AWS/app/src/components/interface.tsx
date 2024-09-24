import React, { useState, useEffect } from 'react';
import DataInputControl from './DataInputControl';
import DustPlot from './plot';
import DataTable from './DataTable';
import ErrorModal from './ErrorBoundary';
import { DataItem } from './types';
import '../styles/App.css';
import { ipUrl } from './Config';

/**
 * The Page component manages the interface of the application.
 * It includes connection testing, data input control, and rendering of the plot and table.
 * 
 * @component
 * @returns The user interface of the page, including the data controls, plot, and table.
 */
const Page: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  /**
   * Handles the data update event, setting new data into the state.
   * 
   * @param newData - Array of new data items to be set.
   */
  const handleDataUpdate = (newData: any[]) => {
    setData(newData as DataItem[]);
  };

  /**
   * Tests the connection to the API endpoint on component mount.
   */
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${ipUrl}/api/test-connection`);
        if (!response.ok) {
          throw new Error('Connection test failed');
        }
        const data = await response.json();
        console.log(data.message); // Should log "Connection successful"
        setIsConnected(true);
      } catch (error) {
        console.error('Connection test failed:', error);
        setIsErrorModalOpen(true);
      }
    };

    testConnection();
  }, []);

  return (
    <div id='interface'>
      {isConnected ? (
        <>
          <DataInputControl onDataUpdate={handleDataUpdate} />
          <DustPlot data={data} numberOfDataValues={data.length} />
          <DataTable data={data} />
        </>
      ) : (
        <div>Testing connection...</div>
      )}
      <ErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={() => setIsErrorModalOpen(false)} 
      />
    </div>
  );
};

export default Page;
