// PopulateData.tsx
import React, { useEffect } from 'react';
import { DataItem } from './types.ts';

interface PopulateDataProps {
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  numberOfDataValues: number;
}

const PopulateData: React.FC<PopulateDataProps> = ({ setData, numberOfDataValues }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://10.203.176.79:5000/api/data?limit=${numberOfDataValues}`);
        const rawData: string = await response.json();
        const actualArray: any[] = JSON.parse(rawData);
        console.log('actualArray', actualArray);

        if (Array.isArray(actualArray)) {
          setData(actualArray as DataItem[]);
        } else {
          console.error('Data is not an array:', actualArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return null;
};

export default PopulateData;
