// interface.tsx
import React, { useState, useEffect } from 'react';
import DataInputControl from './DataInputControl.tsx';
import DustPlot from './plot.tsx';
import DataTable from './DataTable.tsx';
import { DataItem } from './types.ts';

const Page: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const handleDataUpdate = (newData: any[]) => {
    setData(newData as DataItem[]);
  };

  useEffect(() => {
    console.log('Data in Page component:', data);
  }, [data]);

  return (
    <div id='interface'>
      <div id='interface_main'>
        <DataInputControl onDataUpdate={handleDataUpdate} />
        <DustPlot data={data} numberOfDataValues={data.length} />
      </div>
      <DataTable data={data} />
    </div>
  );
};

export default Page;
