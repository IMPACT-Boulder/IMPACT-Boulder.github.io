import React, { useState, useEffect } from 'react';
import DataInputControl from './DataInputControl';
import DustPlot from './plot';
import DataTable from './DataTable';
import ErrorModal from './ErrorBoundary';
import { DataItem } from './types';
import '../styles/App.css';
import { ipUrl } from './Config';

const Page: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleDataUpdate = (newData: any[]) => {
    setData(newData as DataItem[]);
  };

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