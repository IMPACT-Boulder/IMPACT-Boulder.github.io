// PopulateData.tsx

import React, { useEffect } from 'react'; // Import React and useEffect hook
import { DataItem } from './types'; // Import DataItem interface

interface PopulateDataProps {
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>; // Define prop types for PopulateData component
  numberOfDataValues: number; // Define prop types for PopulateData component
}

const PopulateData: React.FC<PopulateDataProps> = ({ setData, numberOfDataValues }) => {
  useEffect(() => {
    // Effect to fetch data
    const fetchData = async () => {
      try {
        // Fetch data from API endpoint
        const response = await fetch(`https://10.247.28.33:3000/api/data?limit=${numberOfDataValues}`);
        const rawData: string = await response.json(); // Get response data as JSON string
        const actualArray: any[] = JSON.parse(rawData); // Parse JSON string to array
        console.log('actualArray', actualArray); // Log the fetched data

        if (Array.isArray(actualArray)) {
          // If fetched data is an array, set the data state
          setData(actualArray as DataItem[]);
        } else {
          // If fetched data is not an array, log an error
          console.error('Data is not an array:', actualArray);
        }
      } catch (error) {
        // Log error if fetching data fails
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return null; // Return null since this component doesn't render anything
};

export default PopulateData; // Export PopulateData component as default