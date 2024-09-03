import React, { useState, useEffect } from 'react';
import DataInputControl from './DataInputControl';
import DustPlot from './plot';
import DataTable from './DataTable';
import ErrorModal from './ErrorBoundary'; // Import the new ErrorModal component
import { DataItem } from './types';
import '../styles/App.css';
import { ipUrl } from './Config'; // Import the URL from the config file

const Page: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleDataUpdate = (newData: any[]) => {
    setData(newData as DataItem[]);
  };

  useEffect(() => {
    console.log('Data in Page component:', data);
  }, [data]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${ipUrl}/api/test-connection`);
        if (!response.ok) {
          throw new Error('Connection test failed');
        }
      } catch (error) {
        console.error('Connection test failed:', error);
        setIsErrorModalOpen(true);
      }
    };

    testConnection();
  }, []);

  return (
    <div id='interface'>
      <DataInputControl onDataUpdate={handleDataUpdate} />
      <DustPlot data={data} numberOfDataValues={data.length} />
      <DataTable data={data} />
      <ErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={() => setIsErrorModalOpen(false)} 
      />
    </div>
  );
};

export default Page;